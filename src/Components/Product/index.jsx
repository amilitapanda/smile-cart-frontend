import i18n from "i18next";
import { Typography, Button } from "neetoui";
import { isNotNil } from "ramda";
import { useParams } from "react-router-dom";
import routes from "routes";
import { useShowProduct } from "src/hooks/reactQuery/useProductsApi";
import withTitle from "utils/withTitle";

import Carousel from "./Carousel";

import { Header, PageNotFound, PageLoader } from "../commons";
import AddToCart from "../commons/AddToCart";
import useSelectedQuantity from "../hooks/useSelectedQuantity";

// import { IMAGE_URLS } from "./constants";

const Product = () => {
  const { slug } = useParams();
  const { data: product = {}, isLoading, isError } = useShowProduct(slug);
  const { selectedQuantity, setSelectedQuantity } = useSelectedQuantity(slug);

  const { name, description, mrp, offerPrice, imageUrls, imageUrl } = product;
  const totalDiscounts = mrp - offerPrice;
  const discountPercentage = ((totalDiscounts / mrp) * 100).toFixed(1);
  if (isLoading) {
    return <PageLoader />;
  }

  if (isError) return <PageNotFound />;

  return (
    <div className="px-6 pb-6">
      <Header showBackButton title={name} />
      <div className="mt-6 flex gap-4">
        <div className="w-2/5">
          <div className="flex justify-center gap-16">
            {isNotNil(imageUrls) ? (
              <Carousel />
            ) : (
              <img alt={name} className="w-48" src={imageUrl} />
            )}
          </div>
        </div>
        <div className="w-3/5 space-y-4">
          <Typography>{description}</Typography>
          <Typography>MRP: {mrp}</Typography>
          <Typography className="font-semibold">
            Offer price: {offerPrice}
          </Typography>
          <Typography className="font-semibold text-green-600">
            {discountPercentage}% off
          </Typography>
          <div className="flex space-x-10">
            <AddToCart {...{ slug }} />
            <Button
              className="bg-neutral-800 hover:bg-neutral-950"
              label="Buy Now"
              size="large"
              to={routes.checkout}
              onClick={() => setSelectedQuantity(selectedQuantity || 1)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default withTitle(Product, i18n.t("product"));
