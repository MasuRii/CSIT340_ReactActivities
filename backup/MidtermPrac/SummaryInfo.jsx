import Grid from '@mui/material/Grid';
import { styled } from '@mui/system';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const FormGrid = styled(Grid)({
  display: 'flex',
  flexDirection: 'column',
  marginBottom: '16px',
});

export default function SummaryInfo({ personalData, educationalData, skillsData }) {
  const navigate = useNavigate();
  return (
    <>
      <Grid container spacing={3} sx={{ textAlign: 'left', padding: '16px' }}>
        <FormGrid item xs={12}><h2>Personal Information</h2></FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>First Name:</strong> {personalData.firstName}
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>Last Name:</strong> {personalData.lastName}
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>Gender:</strong> {personalData.gender}
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>Birthday:</strong> {personalData.birthday}
        </FormGrid>
        <FormGrid item xs={12}>
          <strong>Address:</strong> {personalData.address1}
        </FormGrid>
        <FormGrid item xs={6}>
          <strong>City:</strong> {personalData.city}
        </FormGrid>
        <FormGrid item xs={6}>
          <strong>Province:</strong> {personalData.province}
        </FormGrid>
        <FormGrid item xs={6}>
          <strong>Zip / Postal code:</strong> {personalData.zip}
        </FormGrid>
        <FormGrid item xs={6}>
          <strong>Country:</strong> {personalData.country}
        </FormGrid>

        <FormGrid item xs={12}><h2>Educational Background</h2></FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>Elementary School Name:</strong> {educationalData.elementarySchoolName}
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>Elementary Address:</strong> {educationalData.elementaryAddress}
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>High School Name:</strong> {educationalData.highSchoolName}
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>High School Address:</strong> {educationalData.highSchoolAddress}
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>College School Name:</strong> {educationalData.collegeSchoolName}
        </FormGrid>
        <FormGrid item xs={12} md={6}>
          <strong>College Address:</strong> {educationalData.collegeAddress}
        </FormGrid>

        <FormGrid item xs={12}><h2>Skills and Training</h2></FormGrid>
        <Grid item xs={12} md={6}>
          <strong>Skill 1:</strong> {skillsData.skill1}
        </Grid>
        <Grid item xs={12} md={6}>
          <strong>Skill 2:</strong> {skillsData.skill2}
        </Grid>
        <Grid item xs={12} md={6}>
          <strong>Skill 3:</strong> {skillsData.skill3}
        </Grid>
        <Grid item xs={12} md={6}>
          <strong>Training 1:</strong> {skillsData.training1}
        </Grid>
        <Grid item xs={12} md={6}>
          <strong>Training 2:</strong> {skillsData.training2}
        </Grid>
        <Grid item xs={12} md={6}>
          <strong>Training 3:</strong> {skillsData.training3}
        </Grid>
      </Grid>

      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column-reverse', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: 1,
          padding: '16px',
          mb: '60px',
        }}
      >
        <Button
          variant="text"
          onClick={() => navigate("/skilltr")}
        >
          Previous
        </Button>
      </Box>
    </> //Created By: Math Lee L. Biacolo
  )
}