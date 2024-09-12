import React from "react";
import "./check.css";
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Typography,
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import { CreditCardIcon, LockClosedIcon } from "@heroicons/react/24/solid";

function formatCardNumber(value: string) {
  const val = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
  const matches = val.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || "";
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(" ");
  } else {
    return value;
  }
}

function formatExpires(value: string) {
  return value
    .replace(/[^0-9]/g, "")
    .replace(/^([2-9])$/g, "0$1")
    .replace(/^(1{1})([3-9]{1})$/g, "0$1/$2")
    .replace(/^0{1,}/g, "0")
    .replace(/^([0-1]{1}[0-9]{1})([0-9]{1,2}).*/g, "$1/$2");
}

const CheckOut = () => {
  const [type, setType] = React.useState("card");
  const [cardNumber, setCardNumber] = React.useState("");
  const [cardExpires, setCardExpires] = React.useState("");
  const [senderNumber, setSenderNumber] = React.useState(""); // State for sender's number, adjust as needed

  return (
    <div className="flex items-center justify-center h-full bg-blue-gray-50">
      <Card className="max-w-[24rem] w-full">
        <CardHeader
          color="gray"
          floated={false}
          shadow={false}
          className="m-0 grid place-items-center px-4 py-4 text-center" // Adjusted padding here
        >
          <div className="mb-2 h-12 p-2 text-white">
            {type === "card" ? (
              <CreditCardIcon className="h-8 w-8 text-white" />
            ) : type === "airtel" ? (
              <img
                alt="airtel"
                className="w-10"
                src="assets/logos/airtel.svg"
              />
            ) : (
              <img alt="mtn" className="w-10" src="assets/logos/mtn.svg" />
            )}
          </div>
          <Typography variant="h5" color="white">
            Check Out
          </Typography>
        </CardHeader>
        <CardBody>
          <Tabs value={type} className="overflow-visible">
            <TabsHeader className="relative z-0">
              <Tab value="card" onClick={() => setType("card")}>
                Pay with Card
              </Tab>
              <Tab value="airtel" onClick={() => setType("airtel")}>
                Pay with Airtel
              </Tab>
              <Tab value="mtn" onClick={() => setType("mtn")}>
                Pay with MTN
              </Tab>
            </TabsHeader>
            <TabsBody
              className="!overflow-x-hidden !overflow-y-visible"
              animate={{
                initial: {
                  x: type === "card" ? 400 : -400,
                },
                mount: {
                  x: 0,
                },
                unmount: {
                  x: type === "card" ? 400 : -400,
                },
              }}
            >
              {type === "card" && (
                <TabPanel value="card" className="p-0">
                  <form className="mt-8 flex flex-col gap-4">
                    <div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Your Email
                      </Typography>
                      <Input
                        type="email"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <div className="my-3">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Card Details
                      </Typography>

                      <Input
                        maxLength={19}
                        value={formatCardNumber(cardNumber)}
                        onChange={(event) => setCardNumber(event.target.value)}
                        icon={
                          <CreditCardIcon className="absolute left-0 h-4 w-4 text-blue-gray-300" />
                        }
                        placeholder="0000 0000 0000 0000"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      <div className="my-4 flex items-center gap-4">
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium"
                          >
                            Expires
                          </Typography>
                          <Input
                            maxLength={5}
                            value={formatExpires(cardExpires)}
                            onChange={(event) =>
                              setCardExpires(event.target.value)
                            }
                            containerProps={{ className: "min-w-[72px]" }}
                            placeholder="00/00"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                          />
                        </div>
                        <div>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="mb-2 font-medium"
                          >
                            CVC
                          </Typography>
                          <Input
                            maxLength={4}
                            containerProps={{ className: "min-w-[72px]" }}
                            placeholder="000"
                            className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                            labelProps={{
                              className:
                                "before:content-none after:content-none",
                            }}
                          />
                        </div>
                      </div>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Holder Name
                      </Typography>
                      <Input
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    <Button size="lg">Pay Now</Button>
                    <Typography
                      variant="small"
                      color="gray"
                      className="mt-2 flex items-center justify-center gap-2 font-medium opacity-60"
                    >
                      <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments
                      are secure and encrypted
                    </Typography>
                  </form>
                </TabPanel>
              )}
              {type === "airtel" && (
                <TabPanel value="airtel" className="p-0">
                  <form className="mt-8 flex flex-col gap-4">
                    <div>
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="mb-4 font-medium"
                      >
                        Personal Details
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Your Email
                      </Typography>
                      <Input
                        type="email"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      {/* Add sender's number input */}
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mt-4 -mb-2 font-medium"
                      >
                        Sender's Number
                      </Typography>
                      <Input
                        type="tel"
                        placeholder="Airtel number"
                        value={senderNumber}
                        onChange={(event) =>
                          setSenderNumber(event.target.value)
                        }
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    {/* Add additional fields as needed */}
                    <Button size="lg">Pay with Airtel</Button>
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center justify-center gap-2 font-medium opacity-60"
                    >
                      <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments
                      are secure and encrypted
                    </Typography>
                  </form>
                </TabPanel>
              )}
              {type === "mtn" && (
                <TabPanel value="mtn" className="p-0">
                  <form className="mt-8 flex flex-col gap-4">
                    <div>
                      <Typography
                        variant="paragraph"
                        color="blue-gray"
                        className="mb-4 font-medium"
                      >
                        Personal Details
                      </Typography>
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mb-2 font-medium"
                      >
                        Your Email
                      </Typography>
                      <Input
                        type="email"
                        placeholder="name@mail.com"
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                      {/* Add sender's number input */}
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="mt-4 -mb-2 font-medium"
                      >
                        Sender's Number
                      </Typography>
                      <Input
                        type="tel"
                        placeholder="MTN number"
                        value={senderNumber}
                        onChange={(event) =>
                          setSenderNumber(event.target.value)
                        }
                        className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
                        labelProps={{
                          className: "before:content-none after:content-none",
                        }}
                      />
                    </div>
                    {/* Add additional fields as needed */}
                    <Button size="lg">Pay with MTN</Button>
                    <Typography
                      variant="small"
                      color="gray"
                      className="flex items-center justify-center gap-2 font-medium opacity-60"
                    >
                      <LockClosedIcon className="-mt-0.5 h-4 w-4" /> Payments
                      are secure and encrypted
                    </Typography>
                  </form>
                </TabPanel>
              )}
            </TabsBody>
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
};

export default CheckOut;
