import React, { useState } from "react";
import tw, { css, styled } from 'twin.macro';
import { Formik, Form, Field, ErrorMessage, useField } from "formik";
import * as yup from "yup";
import axios from "axios";
import Image from "next/image";

interface ImageResponse {
  data: {
    url: string;
  }[];
}

const validationSchema = yup.object().shape({
  description: yup.string().required("Description is required"),
});


function Error({ name }: { name: string }) {
  const [field, meta] = useField(name);
  return meta.touched && meta.error ? (
    <div className="error">{meta.error}</div>
  ) : null;
}


export default function ImageGenerator(): JSX.Element {
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleSubmit = async (values: { description: string }, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
    try {
      const response = await axios.post<ImageResponse>(
        "https://api.openai.com/v1/images/generations",
        {
          model: "image-alpha-001",
          prompt: values.description,
          num_images: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          },
        }
      );
      setImageUrl(response.data.data[0].url);
    } catch (error) {
      console.error(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={{ description: "" }} onSubmit={handleSubmit} validationSchema={validationSchema}>
      {({ isSubmitting }) => (
        <Form>
          <label htmlFor="description">Description:</label>
          <Field type="text" name="description" id="description" />
          <div tw="text-red-600">
            <Error name="description" />
          </div>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Generating..." : "Generate Image"}
          </button>

          {imageUrl && <Image
            src={imageUrl}
            alt="Generated Image"
            style={{
              maxWidth: "100%",
              height: "auto"
            }} />}
        </Form>
      )}
    </Formik>
  );
}
