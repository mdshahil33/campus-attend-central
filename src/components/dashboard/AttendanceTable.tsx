
import { useState } from "react";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AttendanceRecord } from "@/types";
import { Search } from "lucide-react";

interface AttendanceTableProps {
  records: AttendanceRecord[];
  title?: string;
}

export default function AttendanceTable({ records, title }: AttendanceTableProps) {
  const [searchQuery, setSearchQuery] = useState("");
  
  const filteredRecords = records.filter(record => 
    record.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.courseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    record.date.includes(searchQuery)
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "present":
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">Present</Badge>;
      case "late":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">Late</Badge>;
      case "absent":
        return <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">Absent</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-4">
      {title && <h3 className="text-lg font-medium">{title}</h3>}
      
      <div className="flex items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name, course, or date..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button variant="outline" className="ml-2" onClick={() => setSearchQuery("")}>
          Clear
        </Button>
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Check-in Time</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record) => (
                <TableRow key={record.id}>
                  <TableCell>{record.date}</TableCell>
                  <TableCell>{record.courseName}</TableCell>
                  <TableCell>{record.studentName}</TableCell>
                  <TableCell>{getStatusBadge(record.status)}</TableCell>
                  <TableCell>{record.checkInTime || "-"}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No attendance records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
