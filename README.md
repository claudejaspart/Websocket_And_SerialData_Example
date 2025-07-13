# Websocket_And_SerialData_Example
A nodejs webserver reads data from a serial port (ie data emitted from an arduino) and updates its value on a webpage using a websocket.

# Notes
The server's url is : localhost:3000

The websocket's url is : localhost:8080

If running in linux, change the portname COMX (where X=1,2,3,...) to /dev/ttyUSBY (where Y=0,1,2...).

You can check the correct port name in linux using the following command : 

```
dmesg | grep tty
```

On windows, search for Device Manager and open the Ports subsection.

# Arduino sample code

Here is the sample code I used for this project. It just outputs the number of milliseconds since the arduino started.

```
void setup() {
  Serial.begin(19200);
}

void loop() {
  Serial.println(millis());
  delay(1000);
}
```
