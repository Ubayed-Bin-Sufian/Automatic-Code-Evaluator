import React, { useState } from 'react';
import { Box, Button, CircularProgress, TextField, Typography, Link, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import { Container } from '@mui/system';
import { collection, getDocs, setDoc, doc } from 'firebase/firestore';
import { db } from '../../firebase/firebaseConfig';
import { languageOptions } from '../../constants/languageOptions'; // Adjust the import path as needed

const Form = () => {
  const [question, setQuestion] = useState('');
  const [code, setCode] = useState('');
  const [numTestCases, setNumTestCases] = useState('');
  const [testCases, setTestCases] = useState([]);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState('');
  
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
      const codingQuestionsCollection = collection(db, 'CodingQuestions');
      const codingQuestionsSnapshot = await getDocs(codingQuestionsCollection);

      // Get the current count of documents
      const currentCount = codingQuestionsSnapshot.size;
      console.log(currentCount)
      // Set the new document ID by incrementing the current count
      const newDocumentId = (currentCount + 1).toString();
      setDocumentId(newDocumentId);

      // Add the new document
      await setDoc(doc(db, 'CodingQuestions', newDocumentId), {
        question,
        code,
        testCases,
        selectedLanguage: selectedLanguageIndex
      });

      setLoading(false);
      setSubmitted(true);
    } catch (error) {
      console.error("Error adding document: ", error);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="h-4 w-full bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500"></div>
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
              <Link href={`https://automatic-code-evaluator.vercel.app/question/${documentId}`} variant="body2">Click here to view your question</Link>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Form;
