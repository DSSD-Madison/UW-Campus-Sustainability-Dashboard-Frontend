import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
} from "recharts";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrendingUp, BarChart2, RefreshCw, Droplet } from "lucide-react";
import { PieGraph } from "@/components/PieGraph";
import { DatePickerWithRange } from "@/components/DatePickerWithRange";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Dashboard: React.FC = () => {
  const [timeframe, setTimeframe] = useState("Last Month");
  const [hall, setHall] = useState("University Overview");
  const [tab, setTab] = useState("KW");

  const data = {
    "Last Week": [
      { name: "Mon", value: 30, overall: 50 },
      { name: "Tue", value: 40, overall: 50 },
      { name: "Wed", value: 35, overall: 50 },
      { name: "Thu", value: 45, overall: 50 },
      { name: "Fri", value: 50, overall: 50 },
    ],
    "Last Month": [
      { name: "Week 1", value: 100, overall: 120 },
      { name: "Week 2", value: 110, overall: 120 },
      { name: "Week 3", value: 105, overall: 120 },
      { name: "Week 4", value: 115, overall: 120 },
    ],
    "Last 6 Months": [
      { name: "Jan", value: 300, overall: 350 },
      { name: "Feb", value: 320, overall: 350 },
      { name: "Mar", value: 310, overall: 350 },
      { name: "Apr", value: 330, overall: 350 },
      { name: "May", value: 340, overall: 350 },
      { name: "Jun", value: 360, overall: 350 },
    ],
  }[timeframe];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-8 space-y-8 bg-gray-100 min-h-screen text-gray-900"
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        style={{ marginTop: -15 }}
      >
        <h1 style={{ fontSize: 30, fontWeight: "bold" }}>Dashboard</h1>
        <Select value={hall} onValueChange={setHall}>
          <SelectTrigger className="w-48 bg-gray-300 border-gray-300 focus-visible:ring-0 focus-visible:outline-none rounded-none">
            <SelectValue>{hall}</SelectValue>
          </SelectTrigger>
          <SelectContent className="bg-white border-gray-300 text-gray-900">
            <SelectItem value="University Overview">University Overview</SelectItem>
            {/* TODO: add all dorms as option */}
            <SelectItem value="Dejope Residence Hall">Dejope Residence Hall</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange />
      </div>
      <Tabs defaultValue={tab} onValueChange={setTab} className="w-[220px]">
        <TabsList className="flex bg-gray-300 p-6 rounded-lg gap-x-2">
          <TabsTrigger
            value="KW"
            className="px-8 py-1 text-lg font-semibold text-black data-[state=active]:bg-white data-[state=active]:text-black rounded-lg transition"
          >
            KW
          </TabsTrigger>
          <TabsTrigger
            value="CO2"
            className="px-8 py-1 text-lg font-semibold text-black data-[state=active]:bg-white data-[state=active]:text-black rounded-lg transition"
          >
            CO2
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: "CO2 Reduction",
            value: "15%",
            icon: <TrendingUp className="w-6 h-6 text-green-500" />,
          },
          {
            title: "Renewable Energy Use",
            value: "70%",
            icon: <BarChart2 className="w-6 h-6 text-blue-500" />,
          },
          {
            title: "Waste Recycled",
            value: "60%",
            icon: <RefreshCw className="w-6 h-6 text-yellow-500" />,
          },
          {
            title: "Water Conservation",
            value: "25%",
            icon: <Droplet className="w-6 h-6 text-teal-500" />,
          },
        ].map((metric, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 flex items-center justify-between"
          >
            <div>
              <div className="text-sm font-medium text-gray-600">
                {metric.title}
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {metric.value}
              </div>
            </div>
            {metric.icon}
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <motion.div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Sustainability Performance
            </h2>
            <Select value={timeframe} onValueChange={setTimeframe}>
              <SelectTrigger className="w-48 bg-white border-gray-300 focus-visible:ring-0 focus-visible:outline-none">
                <SelectValue>{timeframe}</SelectValue>
              </SelectTrigger>
              <SelectContent className="bg-white border-gray-300 text-gray-900">
                <SelectItem value="Last Week">Last Week</SelectItem>
                <SelectItem value="Last Month">Last Month</SelectItem>
                <SelectItem value="Last 6 Months">Last 6 Months</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <ResponsiveContainer width="100%" height={500}>
            <LineChart data={data}>
              <XAxis dataKey="name" stroke="#555" />
              <YAxis stroke="#555" />
              <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#fff",
                  border: "1px solid #ddd",
                  borderRadius: "6px",
                  color: "#333",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#4CAF50"
                strokeWidth={2}
                dot={{ fill: "#4CAF50" }}
              />
              <Line
                type="monotone"
                dataKey="overall"
                stroke="#9CA3AF"
                strokeWidth={2}
                dot={{ fill: "#9CA3AF" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
        >
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Leaderboard
          </h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-gray-600">Rank</TableHead>
                <TableHead className="text-gray-600">Name</TableHead>
                <TableHead className="text-gray-600">Score</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                { rank: 1, name: "Chadbourne", score: 1200 },
                { rank: 2, name: "Ogg", score: 1100 },
                { rank: 3, name: "Witte", score: 1000 },
                { rank: 4, name: "Dejope", score: 900 },
                { rank: 5, name: "Sellery", score: 850 },
              ].map((entry) => (
                <TableRow key={entry.rank} className="hover:bg-gray-100">
                  <TableCell className="font-medium text-gray-900">
                    {entry.rank}
                  </TableCell>
                  <TableCell className="text-gray-700">{entry.name}</TableCell>
                  <TableCell className="text-gray-700">{entry.score}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PieGraph />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Dashboard;
