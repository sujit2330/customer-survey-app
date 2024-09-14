export const getSurveyState = () => {
    const state = localStorage.getItem('surveyState');
    return state ? JSON.parse(state) : null;
  };
  
  export const setSurveyState = (state) => {
    localStorage.setItem('surveyState', JSON.stringify(state));
  };
  