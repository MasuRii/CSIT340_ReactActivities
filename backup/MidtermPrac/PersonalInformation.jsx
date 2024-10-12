import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { styled } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FormGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '16px',
});

export default function PersonalInformation({ personalData, setPersonalData }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
    gender: false,
    birthday: false,
    address1: false,
    city: false,
    province: false,
    zip: false,
    country: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalData({ ...personalData, [name]: value });

    if (value.trim() !== '') {
      setErrors({ ...errors, [name]: false });
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    if (value.trim() === '') {
      setErrors({ ...errors, [name]: true });
    }
  };

  const isValid = () => {
    const {
      firstName,
      lastName,
      gender,
      birthday,
      address1,
      city,
      province,
      zip,
      country,
    } = personalData;
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      gender.trim() !== "" &&
      birthday.trim() !== "" &&
      address1.trim() !== "" &&
      city.trim() !== "" &&
      province.trim() !== "" &&
      zip.trim() !== "" &&
      country.trim() !== ""
    );
  };

  return (
    <>
      <Grid container spacing={3} sx={{ textAlign: 'left', padding: '16px' }}>
        <FormGrid item xs={12}><h1>Personal Information</h1></FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="first-name" required>
            First name
          </FormLabel>
          <TextField
            id="first-name"
            name="firstName"
            type="text"
            placeholder="Eugene"
            required
            size="small"
            fullWidth
            value={personalData.firstName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.firstName}
            helperText={errors.firstName ? 'First name is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="last-name" required>
            Last name
          </FormLabel>
          <TextField
            id="last-name"
            name="lastName"
            type="text"
            placeholder="Busico"
            required
            size="small"
            fullWidth
            value={personalData.lastName}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.lastName}
            helperText={errors.lastName ? 'Last name is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel component="legend" required>
            Gender
          </FormLabel>
          <RadioGroup
            row
            aria-labelledby="gender-label"
            name="gender"
            value={personalData.gender}
            onChange={handleChange}
            onBlur={handleBlur}
          >
            <FormControlLabel value="Female" control={<Radio />} label="Female" />
            <FormControlLabel value="Male" control={<Radio />} label="Male" />
            <FormControlLabel value="Other" control={<Radio />} label="Other" />
          </RadioGroup>
          {errors.gender && (
            <span style={{ color: 'red', fontSize: '0.8rem' }}>Gender is required</span>
          )}
        </FormGrid>

        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="birthday" required>
            Birthday
          </FormLabel>
          <TextField
            id="birthday"
            name="birthday"
            type="date"
            required
            size="small"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={personalData.birthday}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.birthday}
            helperText={errors.birthday ? 'Birthday is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={12}>
          <FormLabel htmlFor="address1" required>
            Address
          </FormLabel>
          <TextField
            id="address1"
            name="address1"
            type="text"
            placeholder="Street/Sitio and Number"
            required
            size="small"
            fullWidth
            value={personalData.address1}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.address1}
            helperText={errors.address1 ? 'Address is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={6}>
          <FormLabel htmlFor="city" required>
            City
          </FormLabel>
          <TextField
            id="city"
            name="city"
            type="text"
            placeholder="Cebu"
            required
            size="small"
            fullWidth
            value={personalData.city}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.city}
            helperText={errors.city ? 'City is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={6}>
          <FormLabel htmlFor="province" required>
            Province
          </FormLabel>
          <TextField
            id="province"
            name="province"
            type="text"
            placeholder="Cebu"
            required
            size="small"
            fullWidth
            value={personalData.province}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.province}
            helperText={errors.province ? 'Province is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={6}>
          <FormLabel htmlFor="zip" required>
            Zip / Postal code
          </FormLabel>
          <TextField
            id="zip"
            name="zip"
            type="text"
            placeholder="6000"
            required
            size="small"
            fullWidth
            value={personalData.zip}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.zip}
            helperText={errors.zip ? 'Zip code is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={6}>
          <FormLabel htmlFor="country" required>
            Country
          </FormLabel>
          <TextField
            id="country"
            name="country"
            type="text"
            placeholder="Philippines"
            required
            size="small"
            fullWidth
            value={personalData.country}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.country}
            helperText={errors.country ? 'Country is required' : ''}
          />
        </FormGrid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 1,
          padding: '16px',
          mb: '60px',
        }}
      >
        <Button
          variant="contained"
          disabled={!isValid()}
          onClick={() => {
            navigate("/educbg");
          }}
        >
          Next
        </Button>
      </Box>
    </> //Created By: Math Lee L. Biacolo
  );
}