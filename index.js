document.addEventListener("DOMContentLoaded", () => {
  const templates = [
    {
      name: "Leave Letter",
      subject: "[Type of Leave] Leave Application from [Your Full Name] for [Dates]",
      content: `I am writing to formally request a [type of leave – personal, sick, vacation, etc.] leave. I would like to request leave from [start date] to [end date], totalling [number of days] days of absence.

[In this part of the email, briefly mention the reason for your leave. If the leave is for medical purposes, state this fact. If personal, you may decide how much information you feel is appropriate to disclose.]

I have ensured that my current projects and responsibilities are accounted for during my absence. [Name of a colleague] has kindly agreed to oversee my work during this period. This will ensure a smooth transition and prevent any disruption in workflow.

Should I need to be contacted for any reason, I am available via email, and [mention any other possible communication method if necessary; otherwise, omit].

I would appreciate your understanding and support regarding this matter, and I am hopeful my leave can be approved as requested. Please let me know if further information or a discussion is required.

Thank you for considering my application. I look forward to your response.`
    },
    {
      name: "Job Application",
      subject: "Applying for a specific position",
      content: `I hope this email finds you well. I recently came across the [Job Title] position at [Company Name] and found it to be a great match for my skills and experience. I am excited to submit my application for your consideration.

As a [current or previous job title] with [number] years of experience in [industry or field], I have developed a strong foundation in [relevant skills or areas]. I am confident in my ability to deliver valuable contributions to your team.

I have attached my resume and cover letter for your review. If you have any questions or require additional information, please don’t hesitate to reach out to me at [your phone number] or [your email].

Thank you for considering my application. I am looking forward to the opportunity to discuss how my skills and experiences align with [Company Name]’s needs.`
    },
    {
      name: "Custom Template",
      subject: "Custom Subject Here",
      content: "Write your own custom email content here..."
    }
  ];

  const container = document.getElementById("templates");

  templates.forEach((template) => {
    const button = document.createElement("button");
    button.textContent = template.name;
    button.onclick = () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          func: insertTemplate,
          args: [template.subject, template.content]
        });
      });
    };
    container.appendChild(button);
  });
});

function insertTemplate(subject, body) {
  //const subjectBox = document.querySelector('input[name="subjectbox"]');
  const bodyBox = document.querySelector('[aria-label="Message Body"]');

  if (/*subjectBox &&*/ bodyBox) {
    //subjectBox.focus();
    //subjectBox.value = subject;

    bodyBox.focus();
    document.execCommand("insertText", false, body);
  } else {
    alert("Please open a Gmail Compose window first.");
  }
}
