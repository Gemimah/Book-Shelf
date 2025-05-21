
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { api } from "@/services/api";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle, Book, BookCheck, Calendar, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    available: 0,
    borrowed: 0,
    overdue: 0,
    reading: 0,
    completed: 0,
    wishlist: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Sample monthly data for demonstration
  const monthlyData = [
    { name: 'Jan', borrowed: 10, returned: 8 },
    { name: 'Feb', borrowed: 15, returned: 12 },
    { name: 'Mar', borrowed: 12, returned: 10 },
    { name: 'Apr', borrowed: 8, returned: 9 },
    { name: 'May', borrowed: 20, returned: 18 },
    { name: 'Jun', borrowed: 14, returned: 13 }
  ];

  // Sample user activity data
  const userActivityData = [
    { name: 'Mon', active: 20 },
    { name: 'Tue', active: 25 },
    { name: 'Wed', active: 30 },
    { name: 'Thu', active: 22 },
    { name: 'Fri', active: 28 },
    { name: 'Sat', active: 18 },
    { name: 'Sun', active: 15 }
  ];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      const response = await api.getBookStatistics();
      
      if (response.error) {
        setError(response.error);
      } else if (response.data) {
        setStats(response.data);
      }
      
      setLoading(false);
    };

    fetchData();
  }, []);

  const pieData = [
    { name: 'Available', value: stats.available, color: '#10b981' },
    { name: 'Borrowed', value: stats.borrowed, color: '#f59e0b' },
    { name: 'Overdue', value: stats.overdue, color: '#ef4444' },
    { name: 'Reading', value: stats.reading, color: '#3b82f6' },
    { name: 'Completed', value: stats.completed, color: '#8b5cf6' },
    { name: 'Wishlist', value: stats.wishlist, color: '#6366f1' }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Skeleton className="h-[180px]" />
        <Skeleton className="h-[180px]" />
        <Skeleton className="h-[180px] md:col-span-2" />
        <Skeleton className="h-[300px] md:col-span-2" />
        <Skeleton className="h-[300px] md:col-span-2" />
      </div>
    );
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription className="flex flex-col gap-4">
          <p>{error}</p>
          <Button variant="outline" size="sm" className="self-start">
            Try Again
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/10 border-amber-200 dark:border-amber-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-amber-800 dark:text-amber-200 flex items-center text-lg">
              <Book className="mr-2 h-5 w-5" />
              Total Books
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-amber-600 dark:text-amber-300">{stats.totalBooks}</div>
            <p className="text-xs text-amber-700/70 dark:text-amber-300/70 mt-1">Books in the catalog</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-teal-50 to-teal-100 dark:from-teal-900/20 dark:to-teal-800/10 border-teal-200 dark:border-teal-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-teal-800 dark:text-teal-200 flex items-center text-lg">
              <Clock className="mr-2 h-5 w-5" />
              Borrowed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-teal-600 dark:text-teal-300">{stats.borrowed}</div>
            <p className="text-xs text-teal-700/70 dark:text-teal-300/70 mt-1">Currently checked out</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-rose-50 to-rose-100 dark:from-rose-900/20 dark:to-rose-800/10 border-rose-200 dark:border-rose-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-rose-800 dark:text-rose-200 flex items-center text-lg">
              <AlertCircle className="mr-2 h-5 w-5" />
              Overdue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-rose-600 dark:text-rose-300">{stats.overdue}</div>
            <p className="text-xs text-rose-700/70 dark:text-rose-300/70 mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/10 border-blue-200 dark:border-blue-800/30">
          <CardHeader className="pb-2">
            <CardTitle className="text-blue-800 dark:text-blue-200 flex items-center text-lg">
              <Users className="mr-2 h-5 w-5" />
              Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-600 dark:text-blue-300">24</div>
            <p className="text-xs text-blue-700/70 dark:text-blue-300/70 mt-1">Active members</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Activity</CardTitle>
            <CardDescription>Book borrowing and returning trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="borrowed" stackId="a" fill="#f59e0b" name="Borrowed" />
                  <Bar dataKey="returned" stackId="a" fill="#10b981" name="Returned" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Book Status Distribution</CardTitle>
            <CardDescription>Current status of all books in library</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData.filter(item => item.value > 0)}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label={({name, percent}) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value} books`, null]} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>User Activity</CardTitle>
            <CardDescription>Weekly user engagement on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={userActivityData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="active" stroke="#8b5cf6" strokeWidth={2} activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
