import {
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Radio,
  Select,
  TimePicker,
  Typography,
  Divider,
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, rerender] = useState(0);
  const [repeatType, setRepeatType] = useState<"d" | "w" | "m">("d");

  const onSelectChange = (value: string) => {
    if (value === "custom") {
      const timeFieldValue: dayjs.Dayjs[] = form.getFieldValue("time");
      secondForm.setFieldValue("secondFormTimeList", timeFieldValue);
      console.log(timeFieldValue);

      setIsSecondModalOpen(true);
    }
  };

  const [secondForm] = Form.useForm();
  const onSubmitSecondForm = (values: SecondFormType) => {
    const secondFormTime = values.secondFormTimeList;
    form.setFieldValue("time", secondFormTime);

    setIsSecondModalOpen(false);
  };
  const [form] = Form.useForm();

  const renderCustom = () => {
    switch (repeatType) {
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
          <Divider orientation="left" orientationMargin="0" plain>
          Frequency
          </Divider>

          <Form.Item name="freq">
            <Radio.Group style={{ display: "flex", flexDirection: "column" }}>
              <Radio
                onChange={() => rerender(1)}
                value="every"
                style={{ width: "100%", display: "block" }}
              >
                {'Every '}
                <Input style={{ width: 65 }} type="number" />
                {' hour(s), starting at '}
                <TimePicker format={"HH:mm"}/>
              </Radio>
              {/* {form.getFieldValue("freq") === "every" && (
                <Typography color="#1890FF" style={{ color: "#1890FF" }}>
                  ToDo will occur every [in the final interface we will spell
                  out the recurrence]
                </Typography>
              )} */}
              <Radio
                onChange={() => rerender(2)}
                value="at"
                style={{ width: "100%", display: "block" }}
              >
              </Radio>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 20,
                }}
              >
                <Form.List initialValue={[dayjs()]} name="time">
                  {(fields, { add, remove }) => (
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {fields.map(({ key, name, ...restField }, index) => (
                        <Form.Item
                          label={index === 0 && "At"}
                          key={key}
                          name={[name, "timePicker"]}
                          {...restField}
                        >
                          <DatePicker.TimePicker
                            format={"HH:mm"}
                            onChange={(value: any) => {
                              if (!value) {
                                remove(index);
                              }
                            }}
                          />
                        </Form.Item>
                      ))}
                      <Form.Item>
                        <PlusButton onClick={() => add()} />
                      </Form.Item>
                    </div>
                  )}
                </Form.List>
                <Form.Item>
                  {'Every '}
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
                        label: "Month",
                      },
                      {
                        value: "custom",
                        label: "Custom",
                      },
                    ]}
                  />
                </Form.Item>
              </div>

              {/* {form.getFieldValue("freq") === "at" && (
                <Typography color="#1890FF" style={{ color: "#1890FF" }}>
                  ToDo will occur every [in the final interface we will spell
                  out the recurrence]
                </Typography>
              )} */}
            </Radio.Group>
          </Form.Item>
        </Form>
        <Divider orientation="left" orientationMargin="0" plain>
        Time to complete
        </Divider>
        <Typography>How long before it is Overdue?</Typography>
        <TimePicker placeholder="Select length of time" format={"HH:mm"} />
      </Modal>
      <Modal
        onCancel={() => setIsSecondModalOpen(false)}
        onOk={() => {
          secondForm.submit();
        }}
        cancelText={"Cancel"}
        title={"Add a new To-Do"}
        open={isSecondModalOpen}
      >
        <Form form={secondForm} onFinish={onSubmitSecondForm}>
          <Typography>Select start and end date</Typography>
          <DatePicker.RangePicker />
          <Form.Item label={"No end date"}>
            <Checkbox />
          </Form.Item>
          <Typography>Time</Typography>
          <Form.List name="secondFormTimeList">
            {(fields, { add, remove }) => {
              return (
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  {fields.map(({ key, name, ...restField }, index) => (
                    <Form.Item
                      {...restField}
                      key={key}
                      name={[name, "timePicker"]}
                    >
                      <DatePicker.TimePicker
                        format={"HH:mm"}
                        onChange={(value: any) => {
                          if (!value) {
                            remove(index);
                          }
                        }}
                      />
                    </Form.Item>
                  ))}
                  <Form.Item>
                    <PlusButton
                      style={{ marginTop: 9 }}
                      onClick={() => add()}
                    />
                  </Form.Item>
                </div>
              );
            }}
          </Form.List>
          <br />
          <div>
            <div style={{ display: "flex", gap: 15 }}>
              <Typography>Repeat every</Typography>
              <Form.Item initialValue={1} name="repeatEveryDayNumber">
                <Input type="number" style={{ width: 65 }} />
              </Form.Item>
              <Form.Item initialValue={"d"} name={"repeatType"}>
                <Select
                  onChange={(value) => setRepeatType(value)}
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
  secondFormTimeList: dayjs.Dayjs[];
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
      width: 24,
      height: 24,
      fontSize: 20,
      marginLeft: 8,
      display: "flex",
      alignItems: 'center',
      justifyContent: "center",
      textAlign:"center",
      ...restProps.style,
    }}
  >
    <p style={{
      margin: 0,
      padding: 0,
      marginBottom: 3,
       }}>+</p>
  </div>
);

export default Greta;
