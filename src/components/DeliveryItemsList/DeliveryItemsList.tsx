import React, { useEffect } from "react";
import DeliveryItem from "../DeliveryItem";
import styles from "./DeliveryItemsList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { setDeliveries } from "../../store/slices/deliveriesSlice";
import { deliveriesMock } from "../../utils/constants";
import { RootState } from "../../store/store";
import { Link, Route } from "react-router-dom";

export interface IDeliveryItemsListProps {}

/**
 * Delivery items list
 */
function DeliveryItemsList(props: IDeliveryItemsListProps) {
  const dispatch = useDispatch();
  const deliveries = useSelector(
    (state: RootState) => state.deliveries.deliveries
  );
  useEffect(() => {
    if (deliveries.length === 0) {
      dispatch(setDeliveries({ deliveries: deliveriesMock }));
    }
  }, []);

  return (
    <div className={styles.root}>
      <h1>Delivery items:</h1>
      {deliveries.map((delivery, index) => (
        <div key={delivery.id}>
          {index + 1}) <Link to={`/${delivery.id}`}>{delivery.client}</Link>
        </div>
      ))}
    </div>
  );
}

export default DeliveryItemsList;
