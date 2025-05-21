
import { useState, useEffect } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableHead, 
  TableRow, 
  TableCell 
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter, BookOpen, BookCheck, Users, ArrowUpDown } from "lucide-react";

// Mock activity log data
const mockActivityLog = [
  { 
    id: "act1", 
    type: "borrow", 
    bookId: "14", 
    bookTitle: "The Lord of the Rings", 
    userId: "user1", 
    userName: "John Doe", 
    timestamp: "2025-05-20T08:30:00Z",
    description: "Book borrowed for 14 days"
  },
  { 
    id: "act2", 
    type: "return", 
    bookId: "7", 
    bookTitle: "The Great Gatsby", 
    userId: "user3", 
    userName: "Emily Davis", 
    timestamp: "2025-05-20T09:45:00Z",
    description: "Book returned on time"
  },
  { 
    id: "act3", 
    type: "login", 
    userId: "user4", 
    userName: "Michael Smith", 
    timestamp: "2025-05-20T10:15:00Z",
    description: "User logged in"
  },
  { 
    id: "act4", 
    type: "add_book", 
    bookId: "24", 
    bookTitle: "The Road", 
    userId: "admin", 
    userName: "Admin User", 
    timestamp: "2025-05-20T11:20:00Z",
    description: "New book added to catalog"
  },
  { 
    id: "act5", 
    type: "edit_book", 
    bookId: "12", 
    bookTitle: "The Alchemist", 
    userId: "admin", 
    userName: "Admin User", 
    timestamp: "2025-05-20T12:05:00Z",
    description: "Updated book metadata"
  },
  { 
    id: "act6", 
    type: "overdue", 
    bookId: "22", 
    bookTitle: "The Da Vinci Code", 
    userId: "user2", 
    userName: "Sarah Johnson", 
    timestamp: "2025-05-20T13:10:00Z",
    description: "Book marked as overdue"
  },
  { 
    id: "act7", 
    type: "signup", 
    userId: "user6", 
    userName: "Alex Turner", 
    timestamp: "2025-05-20T14:30:00Z",
    description: "New user registered"
  },
  { 
    id: "act8", 
    type: "reading_progress", 
    bookId: "16", 
    bookTitle: "The Catcher in the Rye", 
    userId: "user5", 
    userName: "Daniel Wilson", 
    timestamp: "2025-05-20T15:45:00Z",
    description: "Reading progress updated to 45%"
  },
  { 
    id: "act9", 
    type: "return_late", 
    bookId: "18", 
    bookTitle: "The Hunger Games", 
    userId: "user3", 
    userName: "Emily Davis", 
    timestamp: "2025-05-20T16:50:00Z",
    description: "Book returned 3 days late"
  },
  { 
    id: "act10", 
    type: "borrow", 
    bookId: "5", 
    bookTitle: "A Gentleman in Moscow", 
    userId: "user4", 
    userName: "Michael Smith", 
    timestamp: "2025-05-20T17:20:00Z",
    description: "Book borrowed for 14 days"
  },
];

export function AdminActivityLog() {
  const [activities, setActivities] = useState(mockActivityLog);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredActivities, setFilteredActivities] = useState(mockActivityLog);
  const [loading, setLoading] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

  useEffect(() => {
    // Simulate loading
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (searchQuery) {
      const filtered = activities.filter(
        activity =>
          (activity.bookTitle && activity.bookTitle.toLowerCase().includes(searchQuery.toLowerCase())) ||
          activity.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
          activity.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredActivities(filtered);
    } else {
      setFilteredActivities(activities);
    }
  }, [searchQuery, activities]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  const requestSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    const sortedData = [...filteredActivities].sort((a: any, b: any) => {
      if (a[key] < b[key]) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (a[key] > b[key]) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
    
    setFilteredActivities(sortedData);
  };

  const getSortIcon = (key: string) => {
    if (sortConfig && sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '↑' : '↓';
    }
    return null;
  };

  const getActivityTypeIcon = (type: string) => {
    switch(type) {
      case 'borrow':
        return <BookOpen className="h-4 w-4 text-amber-500" />;
      case 'return':
      case 'return_late':
        return <BookCheck className="h-4 w-4 text-green-500" />;
      case 'login':
      case 'signup':
        return <Users className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getRowStyle = (type: string) => {
    switch(type) {
      case 'overdue':
        return 'bg-rose-50 dark:bg-rose-900/20';
      case 'return_late':
        return 'bg-amber-50 dark:bg-amber-900/20';
      case 'add_book':
      case 'edit_book':
        return 'bg-blue-50 dark:bg-blue-900/20';
      default:
        return '';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Activity Log</CardTitle>
          <CardDescription>
            Recent activities in the BookShelf system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search activities..."
                className="pl-9 border-book-amber/30 focus-visible:ring-book-amber"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button variant="outline" className="flex items-center gap-2 border-book-amber/30">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>

          {loading ? (
            <div className="space-y-4">
              <Skeleton className="h-10 w-full" />
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton key={i} className="h-14 w-full" />
              ))}
            </div>
          ) : (
            <div className="rounded-md border overflow-hidden">
              <Table>
                <TableHeader className="bg-muted/30">
                  <TableRow>
                    <TableHead className="w-[100px]">
                      <div className="flex items-center cursor-pointer" onClick={() => requestSort('type')}>
                        Type {getSortIcon('type')}
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => requestSort('description')}>
                        Activity {getSortIcon('description')}
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => requestSort('userName')}>
                        User {getSortIcon('userName')}
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                    <TableHead>
                      <div className="flex items-center cursor-pointer" onClick={() => requestSort('timestamp')}>
                        Date/Time {getSortIcon('timestamp')}
                        <ArrowUpDown className="ml-1 h-3 w-3" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredActivities.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={4} className="text-center py-6">
                        No activities found matching your search criteria.
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredActivities.map((activity) => (
                      <TableRow key={activity.id} className={`${getRowStyle(activity.type)} hover:bg-muted/40`}>
                        <TableCell className="font-medium flex items-center gap-2">
                          {getActivityTypeIcon(activity.type)}
                          <span className="capitalize">{activity.type.replace('_', ' ')}</span>
                        </TableCell>
                        <TableCell>
                          <div>
                            {activity.description}
                            {activity.bookTitle && (
                              <span className="block text-xs text-muted-foreground mt-1">
                                Book: {activity.bookTitle}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{activity.userName}</TableCell>
                        <TableCell>{formatDate(activity.timestamp)}</TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
