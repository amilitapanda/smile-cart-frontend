import { useState, memo } from "react";

import { Delete } from "neetoicons";
import { Alert, Typography } from "neetoui";
import useCartItemsStore from "stores/useCartItemsStore";

import ProductQuantity from "../commons/ProductQuantity";

const ProductCard = ({ slug, imageUrl, offerPrice, mrp, name }) => {
  const [shouldShowDeleteAlert, setShouldShowDeleteAlert] = useState(false);

  // Correctly retrieve removeCartItem action from the store
  const removeCartItem = useCartItemsStore(state => state.removeCartItem);

  return (
    <div className="neeto-ui-rounded neeto-ui-border-black border p-2">
      <div className="flex w-full items-center space-x-5">
        <img alt={name} height={80} src={imageUrl} width={80} />
        <div className="flex-grow space-y-1">
          <Typography className="mb-2" style="h4" weight="bold">
            {name}
          </Typography>
          <Typography style="body2">MRP: ${mrp}</Typography>
          <Typography style="body2">Offer price: ${offerPrice}</Typography>
        </div>
        <div className="flex items-center space-x-2">
          <ProductQuantity {...{ slug }} />
          <Delete
            className="cursor-pointer"
            onClick={() => setShouldShowDeleteAlert(true)}
          />
          <Alert
            isOpen={shouldShowDeleteAlert}
            submitButtonLabel="Yes, remove"
            title="Remove item?"
            message={
              <Typography>
                You are removing <strong>{name}</strong> from cart. Do you want
                to continue?
              </Typography>
            }
            onClose={() => setShouldShowDeleteAlert(false)}
            onSubmit={() => {
              removeCartItem(slug);
              setShouldShowDeleteAlert(false);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default memo(ProductCard);
