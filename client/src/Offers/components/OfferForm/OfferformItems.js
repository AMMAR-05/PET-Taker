////////// Imports //////////
import React, { useContext, useEffect, useState } from "react";
import { FormContext } from "../../../shared/Context/formContext";
// ---------------------Yup & useForm------------------------- //
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// ---------------------Material UI------------------------- //
import {
  FormControl,
  FormControlLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Box,
  Button,
  Typography,
  FormLabel,
} from "@mui/material";

function OfferformItems() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Use Context
  const formContext = useContext(FormContext);

  // Local Storage
  const userImage = localStorage.getItem("userImg");

  ////////// Form Input Schema //////////
  const offerSchema = yup.object().shape({
    offerType: yup
      .string()
      .typeError("please choose either giver or taker")
      .required("A"),
    species: yup.string().required(),
    fullName: yup
      .string()
      .min(2)
      .max(50)
      .trim()
      .required("please provide a fullname"),
    title: yup
      .string()
      .min(2)
      .max(50)
      .trim()
      .required("please provide a title"),
    description: yup.string().required("please provide a description"),
    phoneNumber: yup
      .string()
      .min(4)
      .max(25)
      .required("please provide a phone number"),
    zipcode: yup
      .number()
      .min(2)
      .typeError("must be a number only")
      .required("please provide a zipcode"),
    city: yup.string().min(2).max(50).required("please provide a city"),
    street: yup.string().min(2).max(50).required("please provide a street"),

    startDate: yup.string().typeError("only Date Format"),
    endDate: yup.string().typeError("only Date Format"),
  });

  ////////// React hook Form //////////
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(offerSchema),
  });

  ////////// File Uplaod //////////
  // create a preview as a side effect, whenever selected file is changed
  useEffect(() => {
    if (!image) {
      setPreview(undefined);
      return;
    }

    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreview(fileReader.result);
    };

    fileReader.readAsDataURL(image);
  }, [image]);

  // onSelectFilesHandler
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files === 0) {
      setImage(undefined);
      return;
    }
    setImage(e.target.files[0]);
  };

  //  onRemoveFilesHandler
  const onRemoveFile = (e) => {
    setImage(null);
  };

  ////////// On Form Submit //////////
  // Send form data across form components
  const onSubmit = (offer) => {
    //
    // const finalOffer = { ...offer, userImage };
    const finalOffer = { ...offer, image, userImage };

    //
    const isValid = !formContext.submitForm;
    //
    formContext.getFormData(finalOffer, isValid);

    // Reset Input field
    reset();
  };

  ////////// Styling //////////
  const styles = {
    form: {
      paddingTop: "2rem",
      paddingBottom: "2rem",
      paddingLeft: "48px",
      width: "50rem",
    },
    offerType: {
      width: "20rem",
      marginY: "0.5rem",
    },
    petArt: {
      marginY: "0.5rem",
      width: "20rem",
    },
    personalInfos: { display: "flex", flexDirection: "column" },
    personalInfosInputs: {
      width: "20rem",
      marginBottom: "1.5rem",
    },
    dateContainer: { width: "20rem" },
    date: { width: "20rem", marginBottom: "1rem" },
    formBtn: {
      width: "20rem",
      fontSize: "16px",
      background: "linear-gradient(45deg, #30292F 40%, #3F4045 90%)",
      fontWeight: "700",
      ":hover": {
        background: "linear-gradient(45deg, #3F4045  40%, #30292F  90%)",
      },
      marginY: "2.5rem",
    },
    errors: {
      textTransform: "capitalize",
      color: "red",
      marginY: "0.5rem",
    },
  };

  return (
    <>
      {/* Form */}
      <Box
        sx={styles.form}
        component="form"
        autoComplete="off"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* ********************** Title ************************ */}
        <Typography variant="h5">POST OFFER</Typography>

        {/* ********************** Offer Type ************************ */}
        <Box sx={styles.offerType}>
          <FormControl fullWidth>
            <RadioGroup row>
              <FormControlLabel
                name="offerType"
                label="Taker"
                value="taker"
                control={<Radio />}
                {...register("offerType")}
              />
              <FormControlLabel
                name="offerType"
                value="giver"
                label="Giver"
                control={<Radio />}
                {...register("offerType")}
              />
            </RadioGroup>
          </FormControl>
          <Typography sx={styles.errors}>
            {errors.offerType?.message}
          </Typography>
        </Box>

        {/* ********************** Select pet art ************************ */}
        <Box sx={styles.petArt}>
          <FormControl fullWidth>
            <Select id="select" defaultValue="other" {...register("species")}>
              <MenuItem value="dog">Dog</MenuItem>
              <MenuItem value="cat">Cat</MenuItem>
              <MenuItem value="rodent">Rodent</MenuItem>
              <MenuItem value="bird">Bird</MenuItem>
              <MenuItem value="fish">Fish</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* ********************** Personal Infos  ************************ */}
        <Box sx={styles.personalInfos}>
          {/* ********************** Full Name  ************************ */}
          <TextField
            sx={styles.personalInfosInputs}
            id="fullName"
            label="Full Name"
            variant="standard"
            {...register("fullName")}
          />
          <Typography sx={styles.errors}>{errors.fullName?.message}</Typography>

          {/* ********************** Title  ************************ */}
          <TextField
            sx={styles.personalInfosInputs}
            id="title"
            label="Title"
            variant="standard"
            {...register("title")}
          />
          <Typography sx={styles.errors}>{errors.title?.message}</Typography>

          {/* ********************** Phone Number ************************ */}
          <TextField
            sx={styles.personalInfosInputs}
            id="phoneNumber"
            label="Phone Number"
            variant="standard"
            {...register("phoneNumber")}
          />
          <Typography sx={styles.errors}>
            {errors.phoneNumber?.message}
          </Typography>

          {/* ********************** Zip Code ************************ */}
          <TextField
            sx={styles.personalInfosInputs}
            id="zipcode"
            label="Zipcode"
            variant="standard"
            {...register("zipcode")}
          />
          <Typography sx={styles.errors}>{errors.zipcode?.message}</Typography>

          {/* ********************** City ************************ */}
          <TextField
            sx={styles.personalInfosInputs}
            id="city"
            label="City"
            variant="standard"
            {...register("city")}
          />
          <Typography sx={styles.errors}>{errors.city?.message}</Typography>

          {/* ********************** Street ************************ */}
          <TextField
            sx={styles.personalInfosInputs}
            id="street"
            label="Street"
            variant="standard"
            {...register("street")}
          />
          <Typography sx={styles.errors}>{errors.street?.message}</Typography>

          {/* ********************** Description  ************************ */}
          <TextField
            id="description"
            label="Description"
            multiline
            variant="standard"
            maxRows={4}
            sx={styles.personalInfosInputs}
            {...register("description")}
          />
          <Typography sx={styles.errors}>
            {errors.description?.message}
          </Typography>
        </Box>

        {/* ********************** Date ************************ */}
        <Box sx={styles.dateContainer}>
          {/* Start Date */}
          <FormLabel>Start Date</FormLabel>
          <TextField
            sx={styles.date}
            type="date"
            id="startDate"
            {...register("startDate")}
            variant="standard"
          />

          {/* End Date */}
          <FormLabel>End Date</FormLabel>

          <TextField
            sx={styles.date}
            type="date"
            id="endDate"
            {...register("endDate")}
            variant="standard"
          />
        </Box>

        {/* ********************** image Preview & Upload ************************ */}
        <Box>
          <Box
            sx={{
              width: "20rem",
              height: "15rem",
              borderRadius: "12px",
              background: "linear-gradient(45deg, #30292F 40%, #3F4045 90%)",
            }}
          >
            {preview && (
              <img
                style={{ width: "100%", height: "100%" }}
                src={preview}
                alt=""
              />
            )}
          </Box>

          <Box sx={{ mt: "1rem" }}>
            <Button variant="contained" component="label" sx={{ mr: "9.2rem" }}>
              Upload
              <input
                style={{ display: "none" }}
                accept=".jpg,.png,.jpeg"
                name="image"
                id="image"
                label="image"
                type="file"
                onChange={onSelectFile}
              />
            </Button>
            <Button
              type="button"
              color="secondary"
              variant="contained"
              component="span"
              onClick={onRemoveFile}
            >
              Remove
            </Button>
          </Box>
        </Box>

        {/* ********************** Submit ************************ */}
        <Button type="submit" variant="contained" sx={styles.formBtn}>
          POST OFFER
        </Button>
      </Box>
    </>
  );
}

export default OfferformItems;
