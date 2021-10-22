import fs from "fs";
import { Shopify, Woocommerce } from "../testData/Orders";
import { getMetricData } from "./connector/processor";
import { DataResponse } from "./types/commerceTypes";
import { MetricsItem } from "./types/commons";

function getOrdersItem(): DataResponse {
  return {
    Shopify,
    Woocommerce,
  };
}

const rawData = getOrdersItem();

const filteredOrdersMetrics = getMetricData(rawData, true);
console.log("filtered orders metrics: ", filteredOrdersMetrics);
fs.writeFileSync(
  "./testData/filteredMetrics.json",
  JSON.stringify(filteredOrdersMetrics)
);

/*
const unfilteredOrdersMetrics = getMetricData(rawData, false);
console.log("unfiltered orders metrics: ", unfilteredOrdersMetrics);
fs.writeFileSync(
  "./testData/unfilteredMetrics.json",
  JSON.stringify(unfilteredOrdersMetrics)
)*/
