import React, { useState } from "react";
import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Space,
  Typography,
} from "antd";

const WeekDay = ({ children }: any) => (
  <div
    style={{
      border: "1px solid black",
      borderRadius: 100,
      padding: 4,
      width: 21,
      height: 21,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    {children}
  </div>
);

function App() {
  const [frequency, setFrequency] = useState("");

  const renderFrequencyInputs = () => {
    switch (frequency) {
      case "h":
        return (
          <>
            Every
            <Input style={{ width: 60 }} type="number" />
            Hour(s) Between
            <DatePicker.RangePicker />
            On
            <div style={{ display: "flex", gap: 4 }}>
              <WeekDay>M</WeekDay>
              <WeekDay>Tu</WeekDay>
              <WeekDay>We</WeekDay>
              <WeekDay>Th</WeekDay>
              <WeekDay>F</WeekDay>
              <WeekDay>Sa</WeekDay>
              <WeekDay>Su</WeekDay>
            </div>
          </>
        );
      case "d":
        return (
          <>
            Every
            <Input style={{ width: 60 }} type="number" />
            Day(s) at
            <DatePicker />
          </>
        );
      case "w":
        return (
          <>
            Every
            <Input style={{ width: 60 }} type="number" />
            Week(s) at On
            <div style={{ display: "flex", gap: 4 }}>
              <WeekDay>M</WeekDay>
              <WeekDay>Tu</WeekDay>
              <WeekDay>We</WeekDay>
              <WeekDay>Th</WeekDay>
              <WeekDay>F</WeekDay>
              <WeekDay>Sa</WeekDay>
              <WeekDay>Su</WeekDay>
            </div>
          </>
        );
      case "m":
        return (
          <>
            Every
            <Input style={{ width: 60 }} type="number" />
            Month(s)
          </>
        );
      default:
        return;
    }
  };
  console.log(frequency);

  return (
    <div>
      <Modal cancelText={"Cancel"} title={"Add a new To-Do"} open={true}>
        <Form>
          <Typography>Is this a recurring To-Do?</Typography>
          <Radio>Yes</Radio>
          <Radio>No</Radio>
          <Typography>When should it first start?</Typography>
          <DatePicker.RangePicker />
          <Form.Item label={"No end date"}>
            <Checkbox />
          </Form.Item>
          <Space />
          <Typography>Frequency</Typography>
          <Select
            onChange={(value) => setFrequency(value)}
            value={frequency}
            options={[
              {
                label: "Select frequency",
                value: "",
                disabled: true,
              },
              {
                label: "Hourly",
                value: "h",
              },
              {
                label: "Daily",
                value: "d",
              },
              {
                label: "Weekly",
                value: "w",
              },
              {
                label: "Monhly",
                value: "m",
              },
            ]}
          />
          <br />
          {renderFrequencyInputs()}
        </Form>
      </Modal>
    </div>
  );
}

export default App;
