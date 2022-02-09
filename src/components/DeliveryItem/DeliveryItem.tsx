import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "./DeliveryItem.module.scss";
import { RootState } from "../../store/store";
import {
  finishDelivery,
  setActiveDelivery,
} from "../../store/slices/deliveriesSlice";
import { Link, useParams } from "react-router-dom";
import { useDeliveryItemInfo } from "./useDeliveryItemInfo";

export interface IDeliveryItemProps {}
/**
 * Item with delivery info
 */
function DeliveryItem(props: IDeliveryItemProps) {
  const dispatch = useDispatch();
  const [isCheckingLocation, setIsCheckingLocation] = useState({
    isChecking: false,
    isError: false,
  });

  const { index, delivery, activeDeliveryId } = useDeliveryItemInfo();
  if (!delivery) {
    return <div>Can't find a delivery</div>;
  }

  const { id, details, client, status } = delivery;
  const isActive = id === activeDeliveryId;

  if (status?.message !== "") {
    return (
      <div className={styles.root}>
        <p>{status?.message}</p>
        <p>
          GPS coordinates: {status?.position?.latitude}{" "}
          {status?.position?.longitude}
        </p>
      </div>
    );
  }

  const handleMakeActive = () => {
    dispatch(setActiveDelivery({ id }));
  };

  const navigatorOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0,
  };

  const handleFinishDelivery = (e: any) => {
    const {
      target: { innerHTML },
    } = e;
    setIsCheckingLocation({ ...isCheckingLocation, isChecking: true });
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setIsCheckingLocation({ ...isCheckingLocation, isChecking: false });
        dispatch(
          finishDelivery({
            index,
            status: innerHTML,
            position: {
              latitude: pos.coords.latitude,
              longitude: pos.coords.longitude,
            },
          })
        );
      },
      (err) => {
        setIsCheckingLocation({ ...isCheckingLocation, isError: true });
        console.log({ err });
      },
      navigatorOptions
    );
  };

  const renderButtons = () => {
    if (isActive) {
      return (
        <div>
          <button
            disabled={isCheckingLocation.isChecking}
            onClick={handleFinishDelivery}
          >
            Delivered
          </button>
          <button
            disabled={isCheckingLocation.isChecking}
            onClick={handleFinishDelivery}
          >
            Undelivered
          </button>
          {isCheckingLocation.isChecking && !isCheckingLocation.isError && (
            <div>Wait until get location</div>
          )}
          {isCheckingLocation.isError && (
            <div>
              Please enable location services in your browser and try again
            </div>
          )}
        </div>
      );
    }
    const isExistingActiveDelivery = activeDeliveryId !== "";
    return (
      <>
        <button
          disabled={isExistingActiveDelivery}
          onClick={handleMakeActive}
          title={
            isExistingActiveDelivery
              ? "You can't have 2 active deliveries at the same time"
              : "Make active"
          }
        >
          Make active
        </button>
        {isExistingActiveDelivery && (
          <Link to={`/${activeDeliveryId}`}>Go to current active delivery</Link>
        )}
      </>
    );
  };

  return (
    <div className={styles.root}>
      <p>{details}</p>
      <p>{client}</p>
      {renderButtons()}
    </div>
  );
}

export default DeliveryItem;
