
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { ChartContainer, ChartTooltipContent, ChartTooltip } from "@/components/ui/chart";
import { Book, BookOpen } from "lucide-react";

const COLORS = ['#f59e0b', '#0d9488', '#1e3a8a', '#ef4444'];

interface BookStatusChartProps {
  available: number;
  borrowed: number;
  reading: number;
  overdue: number;
}

export const BookStatusChart = ({ available, borrowed, reading, overdue }: BookStatusChartProps) => {
  const data = [
    { name: 'Available', value: available, color: COLORS[0] },
    { name: 'Borrowed', value: borrowed, color: COLORS[1] },
    { name: 'Reading', value: reading, color: COLORS[2] },
    { name: 'Overdue', value: overdue, color: COLORS[3] }
  ];

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-book-amber" />
          Book Status Distribution
        </CardTitle>
        <CardDescription>Overview of your library's current status</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={120}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export const MonthlyActivityChart = () => {
  // Mock data for monthly book activity
  const data = [
    { month: 'Jan', borrowed: 4, returned: 2 },
    { month: 'Feb', borrowed: 6, returned: 3 },
    { month: 'Mar', borrowed: 8, returned: 7 },
    { month: 'Apr', borrowed: 10, returned: 8 },
    { month: 'May', borrowed: 7, returned: 9 },
    { month: 'Jun', borrowed: 9, returned: 6 },
  ];

  const config = {
    borrowed: {
      label: "Borrowed",
      color: "#f59e0b",
    },
    returned: {
      label: "Returned",
      color: "#0d9488",
    },
  };

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Book className="h-5 w-5 text-book-amber" />
          Monthly Book Activity
        </CardTitle>
        <CardDescription>Number of books borrowed and returned each month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ChartContainer config={config}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" />
              <YAxis />
              <ChartTooltip content={<ChartTooltipContent />} />
              <Line 
                type="monotone" 
                dataKey="borrowed" 
                stroke={config.borrowed.color} 
                name="borrowed" 
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line 
                type="monotone" 
                dataKey="returned" 
                stroke={config.returned.color} 
                name="returned" 
                strokeWidth={2}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ChartContainer>
        </div>
      </CardContent>
    </Card>
  );
};
