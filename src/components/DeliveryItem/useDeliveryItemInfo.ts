import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export const useDeliveryItemInfo = () => {
  const { deliveryId } = useParams();
  const { activeDeliveryId, deliveries } = useSelector(
    (state: RootState) => state.deliveries
  );
  const delivery = deliveries.find(
    (delivery, index) => delivery.id === deliveryId
  );
  const index = deliveries.findIndex((delivery) => delivery.id === deliveryId);
  console.log({ deliveryId, activeDeliveryId });

  return { index, delivery, activeDeliveryId };
};
