
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { QrCode, Camera, ScanLine } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export default function AttendanceScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const handleStartScan = () => {
    setIsScanning(true);
    
    // In a real app, this would initialize the camera and QR scanner
    // For this demo, we'll simulate a successful scan after 3 seconds
    setTimeout(() => {
      handleSuccessfulScan();
    }, 3000);
  };

  const handleSuccessfulScan = () => {
    setIsScanning(false);
    
    toast({
      title: "Successfully Checked In!",
      description: "Your attendance has been recorded.",
    });
  };

  const handleCancelScan = () => {
    setIsScanning(false);
  };

  return (
    <Card className="max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Attendance Check-in</CardTitle>
        <CardDescription>
          Scan the QR code displayed by your instructor to mark your attendance
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {isScanning ? (
          <div className="relative w-64 h-64 bg-black/5 rounded-lg overflow-hidden flex items-center justify-center">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-0.5 bg-campus-primary/50 animate-pulse-slow" />
              <div className="h-full w-0.5 bg-campus-primary/50 animate-pulse-slow" />
            </div>
            <ScanLine className="w-12 h-12 text-campus-primary absolute top-1/2 animate-bounce opacity-70" />
            <Camera className="w-20 h-20 text-muted-foreground/30" />
          </div>
        ) : (
          <div className="w-64 h-64 bg-muted flex items-center justify-center rounded-lg">
            <QrCode className="w-16 h-16 text-muted-foreground" />
          </div>
        )}
        
        <p className="mt-4 text-sm text-center">
          {isScanning 
            ? "Scanning... Please hold your camera steady in front of the QR code" 
            : "When you're ready to check in, press the button below to start scanning"}
        </p>
      </CardContent>
      <CardFooter>
        {isScanning ? (
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handleCancelScan}
          >
            Cancel Scan
          </Button>
        ) : (
          <Button 
            variant="default" 
            className="w-full bg-campus-primary hover:bg-campus-dark-blue"
            onClick={handleStartScan}
          >
            Start Scanning
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
