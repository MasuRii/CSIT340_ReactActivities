import FormLabel from '@mui/material/FormLabel';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const FormGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '16px',
});

export default function EducationalBackground({ educationalData, setEducationalData }) {
  const navigate = useNavigate();

  const [errors, setErrors] = useState({
    elementarySchoolName: false,
    elementaryAddress: false,
    highSchoolName: false,
    highSchoolAddress: false,
    collegeSchoolName: false,
    collegeAddress: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEducationalData({ ...educationalData, [name]: value });

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
      elementarySchoolName,
      elementaryAddress,
      highSchoolName,
      highSchoolAddress,
      collegeSchoolName,
      collegeAddress,
    } = educationalData;
    return (
      elementarySchoolName.trim() !== "" &&
      elementaryAddress.trim() !== "" &&
      highSchoolName.trim() !== "" &&
      highSchoolAddress.trim() !== "" &&
      collegeSchoolName.trim() !== "" &&
      collegeAddress.trim() !== ""
    );
  };

  return (
    <>
      <Grid container spacing={3} sx={{ textAlign: 'left', padding: '16px' }}>
        <FormGrid item xs={12}>
          <h1>Educational Background</h1>
        </FormGrid>

        <FormGrid item xs={12}>
          <h2>Elementary</h2>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="elementarySchoolName" required>
            School Name
          </FormLabel>
          <TextField
            id="elementarySchoolName"
            name="elementarySchoolName"
            type="text"
            placeholder="School Name"
            required
            size="small"
            fullWidth
            value={educationalData.elementarySchoolName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.elementarySchoolName}
            helperText={errors.elementarySchoolName ? 'School Name is required' : ''}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="elementaryAddress" required>
            Address
          </FormLabel>
          <TextField
            id="elementaryAddress"
            name="elementaryAddress"
            type="text"
            placeholder="Address"
            required
            size="small"
            fullWidth
            value={educationalData.elementaryAddress || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.elementaryAddress}
            helperText={errors.elementaryAddress ? 'Address is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={12}>
          <h2>High School</h2>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="highSchoolName" required>
            School Name
          </FormLabel>
          <TextField
            id="highSchoolName"
            name="highSchoolName"
            type="text"
            placeholder="School Name"
            required
            size="small"
            fullWidth
            value={educationalData.highSchoolName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.highSchoolName}
            helperText={errors.highSchoolName ? 'School Name is required' : ''}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="highSchoolAddress" required>
            Address
          </FormLabel>
          <TextField
            id="highSchoolAddress"
            name="highSchoolAddress"
            type="text"
            placeholder="Address"
            required
            size="small"
            fullWidth
            value={educationalData.highSchoolAddress || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.highSchoolAddress}
            helperText={errors.highSchoolAddress ? 'Address is required' : ''}
          />
        </FormGrid>

        <FormGrid item xs={12}>
          <h2>College</h2>
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="collegeSchoolName" required>
            School Name
          </FormLabel>
          <TextField
            id="collegeSchoolName"
            name="collegeSchoolName"
            type="text"
            placeholder="School Name"
            required
            size="small"
            fullWidth
            value={educationalData.collegeSchoolName || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.collegeSchoolName}
            helperText={errors.collegeSchoolName ? 'School Name is required' : ''}
          />
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <FormLabel htmlFor="collegeAddress" required>
            Address
          </FormLabel>
          <TextField
            id="collegeAddress"
            name="collegeAddress"
            type="text"
            placeholder="Address"
            required
            size="small"
            fullWidth
            value={educationalData.collegeAddress || ''}
            onChange={handleChange}
            onBlur={handleBlur}
            error={errors.collegeAddress}
            helperText={errors.collegeAddress ? 'Address is required' : ''}
          />
        </FormGrid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 1,
          padding: '16px',
          mb: '60px',
        }}
      >
        <Button
          variant="text"
          onClick={() => navigate("/perinfo")}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          disabled={!isValid()}
          onClick={() => navigate("/skilltr")}
        >
          Next
        </Button>
      </Box>
    </> 
  ); //Created By: Math Lee L. Biacolo
}