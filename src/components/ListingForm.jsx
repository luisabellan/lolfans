import { useState } from 'react';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { toast } from 'react-hot-toast';
import { Formik, Form } from 'formik';
import Input from '@/components/Input';
import ImageUpload from '@/components/ImageUpload';
import axios, { AxiosResponse } from 'axios';
import { Game } from '@prisma/client';

const ListingSchema = Yup.object().shape({
  title: Yup.string().trim().required(),
  description: Yup.string().trim().required(),
});


const ListingForm = () => {
  const router = useRouter();

  const [initialValues] = useState(null)
  const [disabled, setDisabled] = useState(false);
  const [imageUrl, setImageUrl] = useState(initialValues?.image ?? '');

  const upload = async (image) => {
    if (!image) return;

    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading('Uploading...');
      const { data } = await axios.post('/api/image-upload', { image });
      setImageUrl(data?.url);
      toast.success('Successfully uploaded', { id: toastId });
    } catch (e) {
      console.log(e);
      toast.error('Unable to upload', { id: toastId });
      setImageUrl('');
    } finally {
      setDisabled(false);
    }
  };

  const handleOnSubmit = async (values = null) => {
    let toastId;
    try {
      setDisabled(true);
      toastId = toast.loading('Submitting...');
      // Submit data
      if (typeof onSubmit === 'function') {
        await onSubmit({ ...values, image: imageUrl });
      }
      toast.success('Successfully submitted', { id: toastId });
      // Redirect user
      if (redirectPath) {
        router.push(redirectPath);
      }
    } catch (e) {
      toast.error('Unable to submit', { id: toastId });
      setDisabled(false);
    }
  };

  const { image, ...initialFormValues } = initialValues ?? {
    image: '',
    title: '',
    description: '',
  };

  return (
    <div>
      <div className="mb-8 max-w-md">
        <ImageUpload
          initialImage={image ? Image : null}
          onChangePicture={upload}
        />
        
      </div>

      <Formik
        initialValues={initialFormValues}
        validationSchema={ListingSchema}
        validateOnBlur={false}
        onSubmit={handleOnSubmit}
      >
        {({ isSubmitting, isValid }) => (
          <Form className="space-y-8">
            <div className="space-y-6">
              <Input
                name="title"
                type="text"
                label="Title"
                placeholder="Entire rental unit - Amsterdam"
                disabled={disabled}
              />

              <Input
                name="description"
                type="textarea"
                label="Description"
                placeholder="Very charming and modern apartment in Amsterdam..."
                disabled={disabled}
                rows={5}
              />

            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={disabled || !isValid}
                className="bg-red-600 text-white py-2 px-6 rounded-md focus:outline-none focus:ring-4 focus:ring-red-600 focus:ring-opacity-50 hover:bg-red-500 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-600"
              >
                {isSubmitting ? 'Submitting...' : "Submit"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

ListingForm.propTypes = {
  initialValues: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
  }),
  redirectPath: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
};

export default ListingForm;
