import React, { useState, useEffect } from 'react';
import { Box, Button, CircularProgress, FormControl, InputLabel, Link, MenuItem, Select, TextField, Typography } from '@mui/material';
import { Container } from '@mui/system';
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { languageOptions } from '../../constants/languageOptions';

const Form = () => {
  const [code, setCode] = useState('');
  const [hint, setHint] = useState('');
  const [subject, setSubject] = useState('');
  const [codingQuestion, setCodingQuestion] = useState('');
  const [loading, setLoading] = useState(false);
  const [numTestCases, setNumTestCases] = useState('');
  const [question, setQuestion] = useState('');
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(37);
  const [submitted, setSubmitted] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [link, setLink] = useState('');

  const handleGenerateTestCases = () => {
    const numCases = parseInt(numTestCases, 10);
    if (!isNaN(numCases) && numCases > 0) {
      setTestCases(Array.from({ length: numCases }, () => ({ input: '', output: '' })));
    }
  };

  const handleTestCaseChange = (index, type, value) => {
    const newTestCases = [...testCases];
    newTestCases[index][type] = value;
    setTestCases(newTestCases);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const subjectRef = doc(db, subject, 'CodingQuestion');
      const subjectDoc = await getDoc(subjectRef);

      if (subjectDoc.exists()) {
        // If 'CodingQuestion' document exists, update it
        const existingData = subjectDoc.data();
        const updatedData = {
          ...existingData,
          [codingQuestion]: {
            question,
            code,
            hint,
            testCases,
            selectedLanguage: selectedLanguageIndex
          }
        };
        await setDoc(subjectRef, updatedData);
        setLink(`http://localhost:3000/edit/${subject}/CodingQuestion`);
      } else {
        // If 'CodingQuestion' document doesn't exist, create it
        await setDoc(subjectRef, {
          [codingQuestion]: {
            question,
            code,
            hint,
            testCases,
            selectedLanguage: selectedLanguageIndex
          }
        });
        setLink(`http://localhost:3000/question/${subject}/${codingQuestion}`);
      }

      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

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
            Submit Your Question
          </Typography>
          <TextField
            label="Subject"
            variant="outlined"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
          <TextField
            label="Coding Question"
            variant="outlined"
            value={codingQuestion}
            onChange={(e) => setCodingQuestion(e.target.value)}
            required
          />
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
          <TextField
            label="Number of Test Cases"
            variant="outlined"
            value={numTestCases}
            onChange={(e) => setNumTestCases(e.target.value)}
            required
          />
          <Button variant="contained" color="primary" onClick={handleGenerateTestCases}>
            Generate Test Cases
          </Button>
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
            <Button type="submit" variant="contained" color="primary" disabled={loading}>
              Submit
            </Button>
            {loading && <CircularProgress size={24} sx={{ ml: 2 }} />}
          </Box>
          {submitted && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body1">Your question has been submitted successfully!</Typography>
              <Link href={link} variant="body2">Click here to view your question</Link>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Form;