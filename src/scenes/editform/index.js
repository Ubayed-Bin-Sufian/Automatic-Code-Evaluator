import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { useParams, useNavigate } from 'react-router-dom';
import { doc, getDoc, setDoc } from 'firebase/firestore';

import { db } from '../../firebase/firebaseConfig';
import { languageOptions } from '../../constants/languageOptions';

const EditForm = () => {
  const { subject, codingQuestion } = useParams();
  const navigate = useNavigate();

  const [question, setQuestion] = useState('');
  const [code, setCode] = useState('');
  const [hint, setHint] = useState('');
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(37);
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
    
  useEffect(() => {
    const fetchQuestionData = async () => {
        
      if (subject && codingQuestion) {
        try {
            
            const subjectRef = doc(db, subject, 'CodingQuestion');
          const subjectDoc = await getDoc(subjectRef);

          if (subjectDoc.exists()) {
            const data = subjectDoc.data();
            const questionData = data[codingQuestion];

            if (questionData) {
              setQuestion(questionData.question || '');
              setCode(questionData.code || '');
              setHint(questionData.hint || '');
              setSelectedLanguageIndex(questionData.selectedLanguage || 37);
              setTestCases(questionData.testCases || []);
            } else {
              console.warn("Question not found in the document!");
            }
          } else {
            console.warn("Subject document not found!");
          }
        } catch (error) {
          console.error("Error fetching document: ", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchQuestionData();
  }, [subject, codingQuestion]);

  const handleTestCaseChange = (index, type, value) => {
    setTestCases((prevTestCases) =>
      prevTestCases.map((testCase, i) =>
        i === index ? { ...testCase, [type]: value } : testCase
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      const subjectRef = doc(db, subject, 'CodingQuestion');
      const subjectDoc = await getDoc(subjectRef);

      const updatedData = subjectDoc.exists() ? { ...subjectDoc.data() } : {};
      updatedData[codingQuestion] = {
        question,
        code,
        hint,
        testCases,
        selectedLanguage: selectedLanguageIndex
      };

      await setDoc(subjectRef, updatedData);
      alert("Question updated successfully!");
      navigate(`/question/${subject}/${codingQuestion}`);
    } catch (error) {
      console.error("Error updating document: ", error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <Container maxWidth="sm">
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <>
      <div className="h-20 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
      <Container maxWidth="sm">
        <Box
          component="form"
          sx={{ mt: 4, display: 'flex', flexDirection: 'column', gap: 2 }}
          onSubmit={handleSubmit}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            Edit Your Question
          </Typography>
          <TextField
            label="Question"
            variant="outlined"
            multiline
            rows={4}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <TextField
            label="Code"
            variant="outlined"
            multiline
            rows={8}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <TextField
            label="Hint"
            variant="outlined"
            multiline
            rows={2}
            value={hint}
            onChange={(e) => setHint(e.target.value)}
          />
          <FormControl variant="outlined" sx={{ mt: 2 }}>
            <InputLabel id="language-label">Language</InputLabel>
            <Select
              labelId="language-label"
              value={selectedLanguageIndex}
              onChange={(e) => setSelectedLanguageIndex(e.target.value)}
              label="Language"
              required
            >
              {languageOptions.map((option, index) => (
                <MenuItem key={option.id} value={index}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {testCases.map((testCase, index) => (
            <Box key={index} sx={{ mt: 2 }}>
              <Typography variant="h6">Test Case {index + 1}</Typography>
              <TextField
                label="Expected Input"
                variant="outlined"
                fullWidth
                value={testCase.input}
                onChange={(e) => handleTestCaseChange(index, 'input', e.target.value)}
                required
                sx={{ mt: 1 }}
              />
              <TextField
                label="Expected Output"
                variant="outlined"
                fullWidth
                value={testCase.output}
                onChange={(e) => handleTestCaseChange(index, 'output', e.target.value)}
                required
                sx={{ mt: 1 }}
              />
            </Box>
          ))}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 2 }}>
            <Button type="submit" variant="contained" color="primary" disabled={updating}>
              Update
            </Button>
            {updating && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default EditForm;