import { useRouter } from "next/router";
import Image from "next/image";
import Appbar from "../bar/appbar";
import { marketItem } from "./marketApi";
import ScatterChart from "./chart/ScatterChart";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../provider";
import { useEffect } from "preact/hooks";
import {
  requestFetchMarketItems,
  requestFetchPagingMarketItems,
} from "../../middleware/modules/market";
import axios from "axios";
import { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

export interface PublicItem {
  marketId: number;
  itemId: number;
  crcHave: string;
  cntHave: number;
  crcWant: string;
  cntWant: number;
  dday: string;
  status: boolean;
}

export interface PublicItemPage {
  content: PublicItem[];
}

export interface IndexProp {
  marketItems: PublicItem[];
  marketItemsPage: PublicItemPage[];
}

const getTimeString = (unixtime: number) => {
  const dateTime = new Date(unixtime);
  const day = 24 * 60 * 60 * 1000;
  return unixtime - new Date().getTime() >= day
    ? dateTime.toLocaleDateString()
    : dateTime.toLocaleTimeString();
  // return `${dateTime.toLocaleDateString()} ${dateTime.toLocaleTimeString()}`;
};

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

const itemStatus = (d: boolean) => {
  if (d === true) {
    return <span className="bi bi-play-fill"></span>;
  }
  return <span className="bi bi-stop-fill"></span>;
};

const Index = ({ marketItems, marketItemsPage }: IndexProp) =>
  // { marketItemList }: IndexProp
  {
    const market = useSelector((state: RootState) => state.market);
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();

    // console.log("[log] marketState");
    // console.log(market);

    // console.log("[log] market.data: ");
    // console.log(market.data);

    const handlePageSizeChanged = (e: React.ChangeEvent<HTMLSelectElement>) => {
      console.log(e.currentTarget.value);
      dispatch(
        requestFetchPagingMarketItems({
          page: market.page,
          size: +e.currentTarget.value,
        })
      );
    };

    const series: [
      {
        name: string;
        type: string;
        data: number[];
      },
      {
        name: string;
        type: string;
        data: {
          x: number;
          y: number;
        }[];
      }
    ] = [
      {
        name: "Points",
        type: "scatter",
        //2.14, 2.15, 3.61, 4.93, 2.4, 2.7, 4.2, 5.4, 6.1, 8.3
        data: marketItems.map((d) => (10000 * d.cntHave) / d.cntWant),
      },
      {
        name: "Line",
        type: "line",
        data: [
          {
            x: 1,
            y: 8.41,
          },
          {
            x: 2,
            y: 8.41,
          },
          {
            x: 3,
            y: 8.41,
          },
          {
            x: 4,
            y: 8.41,
          },
          {
            x: 5,
            y: 8.41,
          },
          {
            x: 6,
            y: 8.41,
          },
          {
            x: 7,
            y: 8.41,
          },
          {
            x: 8,
            y: 8.41,
          },
          {
            x: 9,
            y: 8.41,
          },
          {
            x: 10,
            y: 8.41,
          },
        ],
      },
    ];

    const options: ApexOptions = {
      title: {
        text: `USD ?????? ?????? ??????`,
      },
      chart: {
        height: 350,
        type: `line`,
      },
      fill: {
        type: `solid`,
      },
      markers: {
        size: [6, 0],
      },
      tooltip: {
        shared: false,
        intersect: true,
      },
      legend: {
        show: false,
      },
      xaxis: {
        // type: `numeric`,
        // min: 17,
        // max: 44,
        // tickAmount: 12,
      },
    };

    const chartData = {
      series: series,
      options: options,
    };

    // console.log("[log] marketItems: ");
    // console.log(marketItems);

    return (
      <section>
        <Appbar />
        <div id="site-container" style={{ width: "50vw" }} className="mx-auto">
          <h1 className="text-center my-5 fw-bold border-bottom pb-4">
            ??????????????????
          </h1>
          <span>
            <div className="mixed-chart">
              {chartData && (
                <Chart
                  options={chartData?.options}
                  series={chartData?.series}
                  type="line"
                  height={350}
                  // className="mixed-chart"
                ></Chart>
              )}
            </div>
          </span>
          <div
            id="search-form"
            className="gap-2 button-group  mx-auto d-md-flex"
            role="group"
            style={{ width: 150 }}
          >
            <button className="btn btn-secondary">[??????</button>
            <button className="btn btn-secondary">??????]</button>
          </div>{" "}
          {/*?????? ??????*/}
          <span className="bi bi-list badge bg-light fw-bold"> LIST</span>
          <table className="table text-center striped bordered table-hover max-auto">
            <thead>
              <tr className="text-secondary">
                <th scope="col">??????</th>
                <th scope="col">??????</th>
                <th scope="col">??????</th>
                {/*?????? ?????? ???????????? ??????-?????????*/}
                <th scope="col">??????</th>
                <th scope="col">????????????</th>
              </tr>
            </thead>
            <tbody className="border-bottom border-top">
              {" "}
              {/*map?????? ???????????????*/}
              {marketItemsPage.content.map((d: PublicItem, index: number) => (
                <tr
                  key={`market-item-list-${index}`}
                  onClick={() => {
                    router.push(`/market/detail/${d.marketId}`);
                  }}
                >
                  <td>{d.crcHave}</td>
                  <td>{d.cntHave}</td>
                  <td>{d.cntWant}</td>
                  <td>{itemStatus(d.status)}</td>
                  <td>{d.dday}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {marketItems.map((d, index) => (
              <div
                key={`market-item-${index}`}
                className="card mx-auto"
                onClick={() => {
                  router.push(`/market/detail/${d.marketId}`);
                }}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <Image
                      src="/flag_usd.png"
                      alt="USD"
                      width="40"
                      height="40"
                    />
                    USD
                  </h5>
                  <p className="card-text">
                    <div>
                      {d.cntHave}$ to {d.cntWant}w
                    </div>
                    {itemStatus(d.status)}
                    {/* <div className="text-end">??????: {getTimeString(d.dDate)}</div> */}
                    <div className="text-end">??????: {d.dday}</div>
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center btn text-secondary fs-10 fw-bold mx-auto">
            ??? ??????
          </div>
        </div>
        {/* ????????? ??????, ????????? ?????? ?????? */}
      </section>
    );
    // ?????? ?????????
  };

export async function getServerSideProps() {
  const res = await axios.get<PublicItem[]>(
    `${process.env.NEXT_PUBLIC_API_TABLE_LOCAL}/marketItems?page=0&size=8`
  );
  const resPage = await axios.get<PublicItem[]>(
    `${process.env.NEXT_PUBLIC_API_TABLE_LOCAL}/marketItems/latest?page=0&size=8`
  );
  const marketItems = res.data;
  const marketItemsPage = resPage.data;

  return { props: { marketItems, marketItemsPage } };
}

const getChartData = async () => {
  // const result = await axios.get<typeof data>(
  //   "http://localhost:5050/sales-orders/stats?sd=1997-01-01&ed=1997-01-31"
  // );
  // setData(result.data);
};

export default Index;
