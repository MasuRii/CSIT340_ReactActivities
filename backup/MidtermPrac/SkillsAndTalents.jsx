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

export default function SkillsAndTalents({ skillsData, setSkillsData }) {
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSkillsData({ ...skillsData, [name]: value });
  };

  return (
    <>
      <Grid container spacing={3} sx={{ textAlign: 'left', padding: '16px' }}>
        <FormGrid item xs={12}>
          <h1>Skills and Talents</h1>
        </FormGrid>
        <FormGrid item xs={12}>
          <h2>Skills (Max of 3)</h2>
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="skill1">Skill 1</FormLabel>
          <TextField
            id="skill1"
            name="skill1"
            type="text"
            placeholder="Skill 1"
            size="small"
            fullWidth
            value={skillsData.skill1 || ''}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="skill2">Skill 2</FormLabel>
          <TextField
            id="skill2"
            name="skill2"
            type="text"
            placeholder="Skill 2"
            size="small"
            fullWidth
            value={skillsData.skill2 || ''}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="skill3">Skill 3</FormLabel>
          <TextField
            id="skill3"
            name="skill3"
            type="text"
            placeholder="Skill 3"
            size="small"
            fullWidth
            value={skillsData.skill3 || ''}
            onChange={handleChange}
          />
        </FormGrid>

        <FormGrid item xs={12}>
          <h2>Trainings (Max of 3)</h2>
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="training1">Training 1</FormLabel>
          <TextField
            id="training1"
            name="training1"
            type="text"
            placeholder="Training 1"
            size="small"
            fullWidth
            value={skillsData.training1 || ''}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="training2">Training 2</FormLabel>
          <TextField
            id="training2"
            name="training2"
            type="text"
            placeholder="Training 2"
            size="small"
            fullWidth
            value={skillsData.training2 || ''}
            onChange={handleChange}
          />
        </FormGrid>
        <FormGrid item xs={12}>
          <FormLabel htmlFor="training3">Training 3</FormLabel>
          <TextField
            id="training3"
            name="training3"
            type="text"
            placeholder="Training 3"
            size="small"
            fullWidth
            value={skillsData.training3 || ''}
            onChange={handleChange}
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
          onClick={() => navigate("/educbg")}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          onClick={() => navigate("/summaryinfo")}
        >
          Next
        </Button>
      </Box>
    </> //Created By: Math Lee L. Biacolo
  );
}