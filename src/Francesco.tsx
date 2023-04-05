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
  TimePicker,
  Typography,
} from "antd";

const Francesco = ({
  isOpen,
  onClose,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [frequency, setFrequency] = useState("");

  const renderFrequencyInputs = () => {
    switch (frequency) {
      case "h":
        return (
          <>
            {"Every "}
            <Input style={{ width: 60 }} type="number" />
            {" hour(s), between "}
            <TimePicker.RangePicker format={"HH:mm"} />
            <br />
            <div style={{ marginRight: 5 }} />
            <br />
            <Checkbox.Group>
              <div style={{ display: "flex", gap: 1 }}>
                {'On: '}
                <Checkbox value="M">Mon</Checkbox>
                <Checkbox value="Tu">Tue</Checkbox>
                <Checkbox value="We">Wed</Checkbox>
                <Checkbox value="Th">Thu</Checkbox>
                <Checkbox value="F">Fri</Checkbox>
                <Checkbox value="Sa">Sat</Checkbox>
                <Checkbox value="Su">Sun</Checkbox>
              </div>
            </Checkbox.Group>
          </>
        );
      case "d":
        return (
          <>
            {"Every "}
            <Input style={{ width: 60 }} type="number" />
            {" Day(s) at "}
            <TimePicker format={"HH:mm"} />
          </>
        );
      case "w":
        return (
          <>
            {"Every "}
            <Input style={{ width: 60 }} type="number" />
            {" week(s)"}
            <br />
            <br />
            <Checkbox.Group>
              <div style={{ display: "flex", gap: 1 }}>
                {"On: "}
                <Checkbox value="M">Mon</Checkbox>
                <Checkbox value="Tu">Tue</Checkbox>
                <Checkbox value="We">Wed</Checkbox>
                <Checkbox value="Th">Thu</Checkbox>
                <Checkbox value="F">Fri</Checkbox>
                <Checkbox value="Sa">Sat</Checkbox>
                <Checkbox value="Su">Sun</Checkbox>
              </div>
            </Checkbox.Group>
            <br /><br />
            {"At "}
            <TimePicker format={"HH:mm"} />
          </>
        );
      case "m":
        return (
          <>
            {"Every "}
            <Input style={{ width: 60 }} type="number" />
            {" month(s)"}
            <br />
            {"On "}
            <br />
            <Radio> First Friday of the month</Radio>
            <br />
            <Radio> On the 3rd of each month</Radio>
            <br />
            <br />

            {"At "}
            <TimePicker format={"HH:mm"} />
          </>
        );
      default:
        return;
    }
  };
  console.log(frequency);

  return (
    <div>
      <Modal
        onCancel={onClose}
        cancelText={"Cancel"}
        title={"Add a new To-Do"}
        open={isOpen}
      >
        <Form>
          <Typography>Is this a recurring To-Do?</Typography>
          <Radio.Group value={1}>
            <Radio value={1}>Yes</Radio>
            <Radio value={2}>No</Radio>
          </Radio.Group>
          <br /> <br />
          <Typography>Select start and end date</Typography>
          <DatePicker.RangePicker />
          <Form.Item label={"No end date"}>
            <Checkbox />
          </Form.Item>

          <Typography>Frequency</Typography>
          <Select
            onChange={(value) => setFrequency(value)}
            value={frequency}
            style={{ minWidth: 120 }}
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
          <br />
          {renderFrequencyInputs()}
        </Form>
        <br />
        <br />
        <Typography>How long before it is Overdue?</Typography>
        <TimePicker placeholder="Select length of time" format={"HH:mm"} />
      </Modal>
    </div>
  );
};

export default Francesco;
