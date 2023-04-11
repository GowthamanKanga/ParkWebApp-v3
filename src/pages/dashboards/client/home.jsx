import React from "react";
import {
  Typography,
  Card,
  CardHeader,
  CardBody,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Avatar,
  Tooltip,
  Progress,
} from "@material-tailwind/react";
import {
  ClockIcon,
  CheckIcon,
  EllipsisVerticalIcon,
  ArrowUpIcon,
} from "@heroicons/react/24/outline";
import { StatisticsCard } from "@/widgets/cards";
import { StatisticsChart } from "@/widgets/charts";
import {
  statisticsCardsData,
  statisticsChartsData,
  projectsTableData,
  ordersOverviewData,
} from "@/data";

export function Home() {
  return (
    <div className="mt-12">
     <Card className="overflow-hidden  flex justify-center mb-10 xl:col-span-2">
  <CardHeader
    floated={false}
    shadow={false}
    color="transparent"
    className="m-0 flex items-center justify-between p-6"
  >
    <div>
      <Typography variant="h6" color="blue-gray" className="mb-1">
        Create Park 
      </Typography>
      <Typography
        variant="small"
        className="flex items-center gap-1 font-normal text-blue-gray-600"
      >
        
      </Typography>
    </div>
    <button
      className="mb-1 rounded bg-pink-500 px-4 py-2 text-xs font-bold uppercase text-white shadow outline-none transition-all duration-150 ease-linear hover:shadow-md focus:outline-none active:bg-pink-600 sm:mr-2"
      type="button"
    >
      Create
    </button>
  </CardHeader>
</Card>

      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsData.map((props) => (
          <StatisticsChart
            key={props.title}
            {...props}
            footer={
              <Typography
                variant="small"
                className="flex items-center font-normal text-blue-gray-600"
              >
                <ClockIcon strokeWidth={2} className="h-4 w-4 text-inherit" />
                &nbsp;{props.footer}
              </Typography>
            }
          />
        ))}
      </div>
      <div className="mb-4 grid grid-cols-1 gap-6 xl:grid-cols-3">
        
      
      </div>
    </div>
  );
}

export default Home;
