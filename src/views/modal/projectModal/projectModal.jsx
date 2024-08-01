import React from "react";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useForm } from "react-hook-form";

import {
  FormLabel,
  InputGrouptext,
} from "../../../shared/components/wrapperComponent/wrapperComponent";
import {
  SubmitButton,
  CancelButton,
} from "../../../shared/components/systemComponents/systemComponents";
import { breakListTwelve, supervisorList } from "../../../system/constants/globleConstants/globleConstants";

const ProjectModal = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleCancel = () => {
    props.onHide();
  };

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div>
      {" "}
      <Form
        noValidate
        className="ViewUserContent"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="col-lg-12 col-md-12">
          <div class="field fieldSignup mb-3">
            <FormLabel>Peoject Name</FormLabel>
            <InputGroup>
              <InputGrouptext>
                <i class="fa-solid fa-bars-progress color-gray"></i>{" "}
              </InputGrouptext>
              <Form.Control
                className={`rounded-0 light-black ${
                  errors.firstName ? "error-border" : ""
                }`}
                {...register("project", {
                  required: "Project is Required",
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message: "Enter valid Project",
                  },
                })}
              />
            </InputGroup>
            {errors.project && (
              <p className="error-text ">{errors.project.message}</p>
            )}
          </div>
        </div>{" "}
        <div className="col-lg-12 col-md-12">
          <div class="field fieldSignup mb-3">
            <FormLabel>Peoject Description</FormLabel>
            <InputGroup>
              <InputGrouptext>
                <i class="fa-solid fa-align-left color-gray"></i>
              </InputGrouptext>
              <Form.Control
                className={`rounded-0 light-black ${
                  errors.firstName ? "error-border" : ""
                }`}
                {...register("projectDescription", {
                  required: "Project Description is Required",
                  pattern: {
                    value: /^[^\s]+(?:$|.*[^\s]+$)/,
                    message: "Enter valid Project Description",
                  },
                })}
              />
            </InputGroup>
            {errors.projectDescription && (
              <p className="error-text ">{errors.projectDescription.message}</p>
            )}
          </div>
        </div>{" "}
        <div className="col-lg-12 col-md-12">
          {" "}
          <div class="field fieldSignup mb-3 mt-4">
            <FormLabel>Assign To Supervisor</FormLabel>
            <InputGroup>
              <InputGrouptext>
                <i class="fa-solid fa-user color-gray"></i>{" "}
              </InputGrouptext>
              <Form.Select
                className={`rounded-0 light-black ${
                  errors.userGroupName ? "error-border" : ""
                }`}
                {...register("supervisor", {
                  required: "Supervisor to is Required",
                })}
                aria-label="Default select example"
              >
                <option value="">Select Supervisor</option>
                {supervisorList.map((item) => (
                  <option key={item.id} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </Form.Select>
            </InputGroup>
            {errors.supervisor && (
              <p className="error-text ">{errors.supervisor.message}</p>
            )}
          </div>
        </div>
        <div className="d-flex justify-content-center mt-5 ">
          <SubmitButton>Submit</SubmitButton>
          <CancelButton onClick={handleCancel}> Cancel</CancelButton>
        </div>
      </Form>
    </div>
  );
};

export default ProjectModal;
