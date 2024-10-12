import React, { useState } from "react";
import PersonalInformation from "./PersonalInformation";
import EducationalBackground from "./EducationalBackground";
import SkillsAndTalents from "./SkillsAndTalents";
import { Routes, Route, Link } from "react-router-dom";
import SummaryInfo from "./SummaryInfo";

export default function TheRoutes() {
  const [personalData, setPersonalData] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    birthday: "",
    address1: "",
    city: "",
    province: "",
    zip: "",
    country: "",
  });

  const [educationalData, setEducationalData] = useState({
    elementarySchoolName: "",
    elementaryAddress: "",
    highSchoolName: "",
    highSchoolAddress: "",
    collegeSchoolName: "",
    collegeAddress: "",
  });

  const [skillsData, setSkillsData] = useState({
    skill1: "",
    skill2: "",
    skill3: "",
    training1: "",
    training2: "",
    training3: "",
  });

  return (
    <Routes>
      <Route path="/" element={<Link to="perinfo">Start</Link>} />
      <Route
        path="/perinfo"
        element={
          <PersonalInformation
            personalData={personalData}
            setPersonalData={setPersonalData}
          />
        }
      />
      <Route
        path="/educbg"
        element={
          <EducationalBackground
            educationalData={educationalData}
            setEducationalData={setEducationalData}
          />
        }
      />
      <Route
        path="/skilltr"
        element={
          <SkillsAndTalents
            skillsData={skillsData}
            setSkillsData={setSkillsData}
          />
        }
      />
      <Route
        path="/summaryinfo"
        element={
          <SummaryInfo
            personalData={personalData}
            educationalData={educationalData}
            skillsData={skillsData}
          />
        }
      />
      <Route path="*" element={<h1>Nothing Here..</h1>} />
    </Routes>
  ); //Created By: Math Lee L. Biacolo
}