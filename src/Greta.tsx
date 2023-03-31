import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  Typography,
} from "antd";
import { useState } from "react";
import dayjs from "dayjs";

const Greta = ({
  isOpen,
  onClose,
}: {
  onClose: () => void;
  isOpen: boolean;
}) => {
  const [isSecondModalOpen, setIsSecondModalOpen] = useState(false);
  const [_, rerender] = useState(0);

  const onSelectChange = (value: string) => {
    if (value === "custom") {
      setIsSecondModalOpen(true);
    }
  };

  const [secondForm] = Form.useForm();
  const onSubmitSecondForm = (values: SecondFormType) => {
    console.log(values);
    setIsSecondModalOpen(false);
  };
  const [form] = Form.useForm();

  const renderCustom = () => {
    switch (secondForm.getFieldValue("repeatType")) {
      case "d":
        return <div />;
      case "w":
        return (
          <Form.Item name="weeksCheckbox">
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
          </Form.Item>
        );
      case "m":
        return (
          <Radio.Group>
            <Radio>On day 7</Radio>
            <Radio>On the second Tuesday</Radio>
          </Radio.Group>
        );
    }
  };

  return (
    <>
      <Modal
        onCancel={onClose}
        cancelText={"Cancel"}
        title={"Add a new To-Do"}
        open={isOpen}
      >
        <Form form={form}>
          <Typography>Is this a recurring To-Do?</Typography>
          <Radio>Yes</Radio>
          <Radio>No</Radio>
          <br />
          <br />
          <Typography>When should it first start?</Typography>
          <DatePicker />
          <br />
          <br />
          <br />
          <Typography>Frequency</Typography>
          <br />
          <br />
          <Form.Item name="freq">
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
              <Radio
                onChange={() => rerender(1)}
                value="every"
                style={{ width: "100%", display: "block" }}
              >
                Every <Input style={{ width: 65 }} type="number" /> hour(s)
                starting at
                <DatePicker />
              </Radio>
              {form.getFieldValue("freq") === "every" && (
                <Typography color="#1890FF" style={{ color: "#1890FF" }}>
                  ToDo will occur every [in the final interface we will spell
                  out the recurrence]
                </Typography>
              )}
              <Radio
                onChange={() => rerender(2)}
                value="at"
                style={{ width: "100%", display: "block" }}
              ></Radio>
              <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
                <Typography>At</Typography>
                <Form.List initialValue={[dayjs()]} name="time">
                  {(fields, { add, remove }) => (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      {fields.map(({ key, name, ...restField }, index) => (
                        <DatePicker.TimePicker
                          defaultValue={dayjs()}
                          key={key}
                          onChange={(value) => {
                            if (!value) {
                              remove(index);
                            }
                          }}
                        />
                      ))}
                      <PlusButton onClick={add} />
                    </div>
                  )}
                </Form.List>
                <Select
                  defaultValue={"d"}
                  onChange={onSelectChange}
                  style={{
                    width: 113,
                  }}
                  options={[
                    {
                      value: "d",
                      label: "Day",
                    },
                    {
                      value: "w",
                      label: "Week",
                    },
                    {
                      value: "2w",
                      label: "2 Weeks",
                    },
                    {
                      value: "4w",
                      label: "4 Weeks",
                    },
                    {
                      value: "m",
                      label: "month",
                    },
                    {
                      value: "custom",
                      label: "Custom",
                    },
                  ]}
                />
              </div>
              {form.getFieldValue("freq") === "at" && (
                <Typography color="#1890FF" style={{ color: "#1890FF" }}>
                  ToDo will occur every [in the final interface we will spell
                  out the recurrence]
                </Typography>
              )}
            </Radio.Group>
          </Form.Item>
          <br />
          <Typography>How long before it is Overdue?</Typography>
          <DatePicker placeholder="Select length of time" />
          <Typography>Is there an end date?</Typography>
          <Radio>Yes</Radio>
          <Radio>No</Radio>
        </Form>
      </Modal>
      <Modal
        onCancel={() => setIsSecondModalOpen(false)}
        onOk={() => secondForm.submit()}
        cancelText={"Cancel"}
        title={"Add a new To-Do"}
        open={isSecondModalOpen}
      >
        <Form layout="vertical" form={secondForm} onFinish={onSubmitSecondForm}>
          <Form.Item initialValue={dayjs()} name="startDate" label="Start date">
            <DatePicker />
          </Form.Item>
          <Typography>Time</Typography>
          <Form.List initialValue={form.getFieldValue("time")} name="time">
            {(fields, { add, remove }) => (
              <div style={{ display: "flex" }}>
                {fields.map(({ key, name, ...restField }, index) => (
                  <Form.Item key={key} {...restField}>
                    <DatePicker.TimePicker
                      format={"HH:mm"}
                      onChange={(value) => {
                        if (!value) {
                          remove(index);
                        }
                      }}
                    />
                  </Form.Item>
                ))}
                <PlusButton style={{ marginTop: 9 }} onClick={add} />
              </div>
            )}
          </Form.List>
          <br />
          <div>
            <div style={{ display: "flex", gap: 15 }}>
              <Typography>Repeat every</Typography>
              <Form.Item initialValue={1} name="repeatEveryDayNumber">
                <Input type="number" style={{ width: 65 }} />
              </Form.Item>
              <Form.Item initialValue={"w"} name={"repeatType"}>
                <Select
                  options={[
                    { label: "Days", value: "d" },
                    { label: "Weeks", value: "w" },
                    { label: "Months", value: "m" },
                  ]}
                />
              </Form.Item>
            </div>
            {renderCustom()}
            <br />
            <Typography color="#1890FF" style={{ color: "#1890FF" }}>
              ToDo will occur every [in the final interface we will spell out
              the recurrence]
            </Typography>
          </div>
        </Form>
      </Modal>
    </>
  );
};

type SecondFormType = {
  startDate: dayjs.Dayjs;
  weeksCheckbox: ("M" | "Tu" | "We" | "Th" | "F" | "Sa" | "Su")[];
  repeatEveryDayNumber: number;
  repeatType: "w";
};

const PlusButton = ({
  onClick,
  ...restProps
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
>) => (
  <div
    {...restProps}
    onClick={onClick}
    style={{
      backgroundColor: "#1890FF",
      color: "white",
      borderRadius: "100%",
      width: 16,
      height: 16,
      fontSize: 19,
      marginLeft: 8,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      ...restProps.style,
    }}
  >
    +
  </div>
);

export default Greta;
