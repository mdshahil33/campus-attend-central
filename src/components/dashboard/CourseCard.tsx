
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Course } from "@/types";
import { Calendar, MapPin, Users } from "lucide-react";

interface CourseCardProps {
  course: Course;
  onTakeAttendance?: (courseId: string) => void;
  onViewAttendance?: (courseId: string) => void;
}

export default function CourseCard({ 
  course, 
  onTakeAttendance, 
  onViewAttendance 
}: CourseCardProps) {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <CardTitle className="text-xl">{course.name}</CardTitle>
          <Badge variant="outline" className="bg-campus-primary/10 text-campus-primary">
            {course.code}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-1">
        <div className="space-y-3 text-sm">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{course.students.length} Student{course.students.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="flex items-center">
            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{course.schedule}</span>
          </div>
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span>{course.location}</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="pt-2 flex gap-2">
        {onTakeAttendance && (
          <Button 
            variant="default" 
            className="w-full bg-campus-primary hover:bg-campus-dark-blue"
            onClick={() => onTakeAttendance(course.id)}
          >
            Take Attendance
          </Button>
        )}
        {onViewAttendance && (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => onViewAttendance(course.id)}
          >
            View Attendance
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
