import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
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
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
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

          <ErrorMessage name="description" component="div" style={{ color: "red" }} />

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Generating..." : "Generate Image"}
          </button>

          {imageUrl && <Image src={imageUrl} alt="Generated Image" />}

          <style jsx>{`
            label,
            input {
              display: block;
              margin-bottom: 0.5rem;
            }
          `}</style>
        </Form>
      )}
    </Formik>
  );
}
