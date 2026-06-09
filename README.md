# AI-Powered Career Mentor & Skill Gap Analyzer

## 📌 Overview

AI-Powered Career Mentor & Skill Gap Analyzer helps students identify skill gaps, analyze resumes, receive AI-based career guidance, and generate personalized learning roadmaps.

---

## 🚀 Features

- Resume Analysis
- Skill Extraction
- Skill Gap Detection
- Career Recommendations
- Learning Roadmap Generation
- Career Readiness Score
- AI-Based Guidance

---

## 🛠 Tech Stack

### Frontend
- React.js
- HTML
- CSS
- Bootstrap

### Backend
- Java Spring Boot
- REST API

### Database
- MySQL

### Additional Technologies
- Gemini/OpenAI API
- JWT Authentication
- Chart.js
- Maven
- GitHub

---

## 📂 Project Structure

```
Career-Mentor/
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   └── App.js
│
├── backend/
│   ├── controller/
│   ├── service/
│   ├── repository/
│   ├── model/
│   └── CareerMentorApplication.java
│
├── database/
│   └── careermentor.sql
│
└── README.md
```

---

## Database Table

```sql
CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100),
    email VARCHAR(100),
    department VARCHAR(50),
    skills TEXT
);
```

---

## Spring Boot API

```java
@RestController
@RequestMapping("/api")
public class CareerController {

    @GetMapping("/skills")
    public String getSkills() {
        return "Skill Analysis Completed";
    }
}
```

---

## React Frontend Example

```jsx
function Home() {
  return (
    <div>
      <h1>AI Career Mentor</h1>
      <p>Analyze your skills and get career guidance.</p>
    </div>
  );
}

export default Home;
```

---

## Skill Gap Analysis Logic

```java
List<String> studentSkills =
Arrays.asList("Java","HTML","CSS");

List<String> requiredSkills =
Arrays.asList("Java","React","Spring Boot");

requiredSkills.removeAll(studentSkills);

System.out.println(requiredSkills);
```

### Output

```
[React, Spring Boot]
```

---

## Future Enhancements

- AI Mock Interview
- Internship Recommendation
- LinkedIn Profile Analysis
- Real-Time Job Market Analysis
- Mobile Application

---

## Author

Name: Your Name

Department: Artificial Intelligence & Data Science

College: Your College Name

---

## License

Educational Purpose Only
