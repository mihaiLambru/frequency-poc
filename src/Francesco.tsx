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
            On
            <div style={{ marginRight: 5 }} />
            <Checkbox.Group>
              <div style={{ display: "flex", gap: 4 }}>
                <Checkbox value="M">M</Checkbox>
                <Checkbox value="Tu">Tu</Checkbox>
                <Checkbox value="We">We</Checkbox>
                <Checkbox value="Th">Th</Checkbox>
                <Checkbox value="F">F</Checkbox>
                <Checkbox value="Sa">Sa</Checkbox>
                <Checkbox value="Su">Su</Checkbox>
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
            {"On "}
            <Checkbox.Group>
              <div style={{ display: "flex", gap: 4 }}>
                <Checkbox value="M">M</Checkbox>
                <Checkbox value="Tu">Tu</Checkbox>
                <Checkbox value="We">We</Checkbox>
                <Checkbox value="Th">Th</Checkbox>
                <Checkbox value="F">F</Checkbox>
                <Checkbox value="Sa">Sa</Checkbox>
                <Checkbox value="Su">Su</Checkbox>
              </div>
            </Checkbox.Group>
            <br />
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
        <Typography>How long before it is Overdue?</Typography>
        <TimePicker placeholder="Select length of time" format={"HH:mm"} />
      </Modal>
    </div>
  );
};

export default Francesco;
