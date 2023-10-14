import React, { useState } from 'react';

const QueryBuilder = () => {
  const [sections, setSections] = useState([
    {
      logicalOperator: 'AND',
      conditions: [{ field: '', operator: 'equals', value: '' }],
    },
  ]);

  const addSection = () => {
    setSections([...sections, { logicalOperator: 'AND', conditions: [{ field: '', operator: 'equals', value: '' }] }]);
  };

  const addSubsection = (sectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].conditions.push({ field: '', operator: 'equals', value: '' });
    setSections(updatedSections);
  };

  const removeSubsection = (sectionIndex, subsectionIndex) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].conditions.splice(subsectionIndex, 1);
    setSections(updatedSections);
  };

  const handleLogicalOperatorChange = (sectionIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].logicalOperator = value;
    setSections(updatedSections);
  };

  const handleFieldChange = (sectionIndex, subsectionIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].conditions[subsectionIndex].field = value;
    setSections(updatedSections);
  };

  const handleOperatorChange = (sectionIndex, subsectionIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].conditions[subsectionIndex].operator = value;
    setSections(updatedSections);
  };

  const handleValueChange = (sectionIndex, subsectionIndex, value) => {
    const updatedSections = [...sections];
    updatedSections[sectionIndex].conditions[subsectionIndex].value = value;
    setSections(updatedSections);
  };

  return (
    <div>
      <h2>Query Builder</h2>
      {sections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="section">
          <select onChange={(e) => handleLogicalOperatorChange(sectionIndex, e.target.value)}>
            <option value="AND">AND</option>
            <option value="OR">OR</option>
          </select>
          {section.conditions.map((subsection, subsectionIndex) => (
            <div key={subsectionIndex} className="subsection">
              <select onChange={(e) => handleFieldChange(sectionIndex, subsectionIndex, e.target.value)}>
                <option value="">Select Field</option>
                <option value="name">Name</option>
                <option value="age">Age</option>
                {/* Add more fields as needed */}
              </select>
              <select onChange={(e) => handleOperatorChange(sectionIndex, subsectionIndex, e.target.value)}>
                <option value="equals">Equals</option>
                <option value="contains">Contains</option>
                {/* Add more operators as needed */}
              </select>
              <input
                type="text"
                placeholder="Value"
                value={subsection.value}
                onChange={(e) => handleValueChange(sectionIndex, subsectionIndex, e.target.value)}
              />
              <button onClick={() => removeSubsection(sectionIndex, subsectionIndex)}>Remove</button>
            </div>
          ))}
          <button onClick={() => addSubsection(sectionIndex)}>Add Subsection</button>
        </div>
      ))}
      <button onClick={addSection}>Add Section</button>
      <div className="query">
        <strong>Query:</strong> {JSON.stringify(sections)}
      </div>
    </div>
  );
};

export default QueryBuilder;
