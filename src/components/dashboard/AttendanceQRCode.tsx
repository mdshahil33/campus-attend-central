
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AttendanceSession } from "@/types";
import { QrCode } from "lucide-react";

interface AttendanceQRCodeProps {
  session: AttendanceSession;
  onEnd?: () => void;
}

export default function AttendanceQRCode({ session, onEnd }: AttendanceQRCodeProps) {
  return (
    <Card className="max-w-sm mx-auto border-2 border-campus-primary">
      <CardHeader>
        <CardTitle>{session.courseName}</CardTitle>
        <CardDescription>
          Session: {session.date} | {session.startTime} - {session.endTime}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {session.qrCode ? (
          <img 
            src={session.qrCode} 
            alt="QR Code" 
            className="w-48 h-48 border p-2 rounded-lg"
          />
        ) : (
          <div className="w-48 h-48 bg-muted flex items-center justify-center rounded-lg">
            <QrCode className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        <p className="mt-4 text-sm text-center">
          Students can scan this QR code to mark their attendance.
        </p>
      </CardContent>
      <CardFooter>
        <Button 
          variant="default" 
          className="w-full bg-campus-secondary hover:bg-campus-secondary/90"
          onClick={onEnd}
        >
          End Session
        </Button>
      </CardFooter>
    </Card>
  );
}
