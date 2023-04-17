import React, { useState } from "react";
import axios from "axios";

interface ImageResponse {
  data: {
    url: string;
  }[];
}

export default function ImageGenerator(): JSX.Element {
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const response = await axios.post<ImageResponse>(
      "https://api.openai.com/v1/images/generations",
      {
        model: "image-alpha-001",
        prompt: description,
        num_images: 1,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
        },
      }
    );
    setImageUrl(response.data.data[0].url);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(event.target.value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Description:
          <input type="text" value={description} onChange={handleChange} />
        </label>
        <button type="submit">Generate Image</button>
      </form>
      {imageUrl && <img src={imageUrl} alt="Generated Image" />}
    </div>
  );
}
