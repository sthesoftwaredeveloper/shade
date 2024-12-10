import { useState } from 'react';
import { QuestionInput } from '../../components/planning/QuestionInput';
import { ProgressBar } from '../../components/planning/ProgressBar';
import { ActionButtons } from '../../components/planning/ActionButtons';
import { Link } from 'react-router-dom';

export function DataManagement() {
  const [answers, setAnswers] = useState({
    dataPlans: '',
    dataSufficiency: '',
    dataDeletion: '',
    dataEndOfLife: '',
    hosting: {
      cloud: false,
      local: false,
      notSure: false
    },
    cloudQuestion1: '',
    cloudQuestion2: '',
    cloudQuestion3: '',
    cloudQuestion4: '',
    cloudQuestion5: '',
    cloudQuestion6: '',
    cloudQuestion7: '',
    cloudQuestion8: '',
    localQuestion1: '',
    localQuestion2: '',
    localQuestion3: '',
    localQuestion4: '',
    localQuestion5: '',
    localQuestion6: '',
    localQuestion7: ''
  });

  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (field: keyof typeof answers) => (value: string) => {
    setAnswers(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const toggleHostingType = (type: keyof typeof answers.hosting) => {
    if (type === 'notSure') {
      setShowPopup(true);
      setAnswers(prev => ({
        ...prev,
        hosting: {
          ...prev.hosting,
          notSure: !prev.hosting.notSure,
          cloud: false,
          local: false
        }
      }));
    } else {
      setAnswers(prev => ({
        ...prev,
        hosting: {
          ...prev.hosting,
          [type]: !prev.hosting[type],
          notSure: false
        }
      }));
    }
  };

  // Calculate progress including nested questions
  const totalQuestions = 4 + 8 + 7; // 4 top-level + 8 cloud + 7 local

  const answeredQuestions = [
    answers.dataPlans,
    answers.dataSufficiency,
    answers.dataDeletion,
    answers.dataEndOfLife,
    ...Object.values(answers.hosting),
    answers.cloudQuestion1,
    answers.cloudQuestion2,
    answers.cloudQuestion3,
    answers.cloudQuestion4,
    answers.cloudQuestion5,
    answers.cloudQuestion6,
    answers.cloudQuestion7,
    answers.cloudQuestion8,
    answers.localQuestion1,
    answers.localQuestion2,
    answers.localQuestion3,
    answers.localQuestion4,
    answers.localQuestion5,
    answers.localQuestion6,
    answers.localQuestion7
  ].filter(Boolean).length;

  const progress = (answeredQuestions / totalQuestions) * 100;

  return (
    <div className="relative">
      <div className="flex justify-between items-start mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Collecting, storing, and/or processing data
        </h1>

        <ActionButtons />
      </div>

      <ProgressBar progress={progress} />

      <div className="bg-green-50 p-4 rounded-lg mb-8">
        <p className="text-green-800 flex items-center gap-2">
          Not doing software in house?
          <Link
            to="/planning/procurement"
            className="inline-flex items-center text-green-700 hover:text-green-800 font-medium"
          >
            Go to procurement →
          </Link>
        </p>
      </div>
      <div className="space-y-8">
        <QuestionInput
          question="What data do you plan on collecting, storing and/or processing over the next decade, on an annual basis? Are you aware of any other planned or existing Digital Service that is collecting part or all of this data?"
          tooltip={`Planning mitigates the risk of wasting compute resources by either over or underestimating the data that you will need:

• Overestimation will generate unnecessary data
• Underestimation increases the risk that the digital health system will not achieve its health outcomes

If any of the data you plan to collect is already being collected, or will be collected via another planned digital health initiative, find out whether you could access it, rather than collecting it again from scratch.

Benefits of data sharing:
• Avoids unnecessary energy expenditure in storing duplicate data
• Prevents unnecessary effort and data collection fatigue
• Reduces the likelihood of collecting the same data twice

Important considerations:
• Data providers may find the exercise burdensome
• Data collectors may resort to outsourcing collection, potentially affecting quality
• To ensure good quality data, provide tangible benefits for each local community involved`}
          value={answers.dataPlans}
          onChange={handleChange('dataPlans')}
        />

        <QuestionInput
          question="How do you plan to ensure data sufficiency?"
          tooltip={`Data sufficiency means only collecting and processing data sufficient for the outcome you need to achieve.

Examples of data 'beyond what is sufficient':

• Collecting unnecessary demographic data (e.g. employment/marital status) when not needed
• Images with unnecessarily high resolution
• Monitoring data collected at an unnecessarily high frequency
• Using high resolution videoconferencing when lower resolution or phone calls would suffice`}
          value={answers.dataSufficiency}
          onChange={handleChange('dataSufficiency')}
        />

        <QuestionInput
          question="What systems do you have in place to delete data that is no longer needed, and to check and manage duplicate data?"
          tooltip={`Addressing 'dark data' (data collected but never used) can significantly reduce energy consumption.

Key techniques:

1. Data Governance
   • Identify relevant regulations for data retention
   • Establish processes for deleting unnecessary data

2. Data Management
   • Organize data into distinct categories
   • Ensure accurate and complete data views

3. Data Sharing Strategy
   • Implement to prevent data redundancy

4. Tiered Data Storage
   • Store data based on access frequency
   • Use cold storage (lower energy cost) for archived data`}
          value={answers.dataDeletion}
          onChange={handleChange('dataDeletion')}
        />

        <QuestionInput
          question="What happens to the data when the system is no longer in use?"
          tooltip={`Important considerations for data end-of-life:

• Digital health systems may not last as long as originally anticipated
• Data is often left in place when systems become inactive
• Robust plans should be established from the start
• Clear processes needed for deleting redundant data when system becomes inactive`}
          value={answers.dataEndOfLife}
          onChange={handleChange('dataEndOfLife')}
        />

        <div>
          <h4>Will you use cloud or local server(s) or both to host data?</h4>

          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={answers.hosting.cloud}
                onChange={() => toggleHostingType('cloud')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Cloud</span>
            </label>

            <label className="inline-flex items-center">
              <input
                type="checkbox"
                checked={answers.hosting.local}
                onChange={() => toggleHostingType('local')}
                className="form-checkbox h-4 w-4 text-blue-600"
              />
              <span className="ml-2">Local Server(s)</span>
            </label>

            <div className="inline-flex items-center">
              <span>Not Sure</span>
              <button
                onClick={() => setShowPopup(true)}
                className="ml-1 text-gray-400 hover:text-gray-600"
                aria-label="More information"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {showPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg max-w-2xl relative">
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              >
                ×
              </button>

              <div className="prose">
                <p>
                  Have you compared a cloud option with the local server option from an environmental sustainability perspective? Cloud hosting is capable of achieving greater energy efficiency if it is correctly configured. However, be aware that other issues are being raised around cloud, particularly in relation to{' '}
                  <a
                    href="https://www.techtarget.com/whatis/definition/data-sovereignty"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    data sovereignty
                  </a>,{' '}
                  <a
                    href="https://www.cloudflare.com/en-gb/learning/cloud/what-is-vendor-lock-in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    vendor lock ins
                  </a> and{' '}
                  <a
                    href="https://www.thegreenwebfoundation.org/news/the-politics-of-data-centers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    social justice
                  </a>.
                </p>

                <p>
                  Furthermore, while Cloud is usually more efficient for large scale processing, you will want to minimise the transfer of data between your Digital Health System end users and the cloud as this process requires energy and incurs carbon emissions. This means it may make sense to undertake{' '}
                  <a
                    href="thesaurus.html#edg_com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800"
                  >
                    "edge computing"
                  </a> on your local servers if they are nearer your end users.
                </p>

                <p>
                  If your Digital Health System will be hosted on a hybrid model – so making use of both local servers and cloud – investigate both of these options and consider how best to split the data and processing between them.
                </p>
              </div>
            </div>
          </div>
        )}

        {answers.hosting.cloud && (
          <div className="dropdown">
            <h4>Additional Questions for Cloud Hosting</h4>

            <QuestionInput
              question="How is the data centre powered? If it is mainly using renewables, is it using its own renewable energy, or is it powered from the grid?"
              value={answers.cloudQuestion1}
              onChange={handleChange('cloudQuestion1')}
              tooltip={`Consider:

• Primary power source
• Percentage of renewable energy used
• Whether renewables are on-site or grid-sourced
• Backup power systems and their environmental impact`}
            />

            <QuestionInput
              question="If it is powered from the grid, where the proportion of the energy supplied that comes from renewable sources is always changing, does your hosting provider offer any options for temporal or spatial shifting?"
              tooltip={`Key concepts:

Temporal Shifting:
• Maximizing data processing during high renewable energy periods
• Scheduling non-critical tasks during optimal energy times

Spatial Shifting:
• Running processes at different data center locations based on renewable energy availability
• Balancing between primary and secondary locations

Considerations:
• Critical vs non-critical processing needs
• Flexibility in scheduling maintenance tasks
• Impact on system performance and availability`}
              value={answers.cloudQuestion2}
              onChange={handleChange('cloudQuestion2')}
            />

            <QuestionInput
              question="What types of cooling systems are being used and how much energy and water do they consume?"
              tooltip={`Important factors to consider:

1. Energy Consumption:
   • Cooling system efficiency ratings
   • Power usage for different cooling methods
   • Impact on overall data center energy use

2. Water Usage:
   • Water consumption metrics
   • Water recycling capabilities
   • Environmental impact of water usage

3. System Types:
   • Air-based cooling
   • Liquid cooling
   • Hybrid systems
   • Free cooling options

4. Impact on Hardware:
   • Temperature management effectiveness
   • Hardware lifespan considerations
   • Thermal distribution`}
              value={answers.cloudQuestion3}
              onChange={handleChange('cloudQuestion3')}
            />

            <QuestionInput
              question="Are the PUE, CUE, and WUE sustainability metrics available for the data centre? What are the values for these?"
              tooltip={`Key Metrics Explained:

PUE (Power Usage Effectiveness):
• Ideal value: 1.0
• Measures total facility power vs IT equipment power
• Lower values indicate better efficiency

CUE (Carbon Usage Effectiveness):
• Ideal value: 0
• Measures total CO2 emissions from data center operations
• Lower values indicate more carbon-neutral operations

WUE (Water Usage Effectiveness):
• Ideal value: 0
• Measures water usage for cooling and other purposes
• Lower values indicate better water efficiency`}
              value={answers.cloudQuestion4}
              onChange={handleChange('cloudQuestion4')}
            />

            <QuestionInput
              question="Is excess heat from the data centre recovered and reused, so it can displace fossil fuel heat sources?"
              value={answers.cloudQuestion5}
              onChange={handleChange('cloudQuestion5')}
              tooltip={`Consider:

• Heat recovery systems in place
• Applications for recovered heat
• Energy savings from heat reuse
• Impact on overall carbon footprint`}
            />

            <QuestionInput
              question="What is the plan for the data centre to be sustainably decommissioned if/when it comes to its end of life?"
              tooltip={`Key Decommissioning Considerations:

1. Hardware Disposal:
   • Recycling programs
   • E-waste management
   • Component reuse opportunities

2. Environmental Impact:
   • Proper disposal of cooling systems
   • Management of hazardous materials
   • Site restoration plans

3. Data Security:
   • Secure data destruction
   • Hardware sanitization
   • Compliance with regulations`}
              value={answers.cloudQuestion6}
              onChange={handleChange('cloudQuestion6')}
            />

            <QuestionInput
              question="Would your digital health system be hosted in a verified green data centre?"
              tooltip={`Green Data Centre Verification:

• Check The Green Web Foundation's verified list
• Look for environmental certifications
• Review sustainability commitments
• Assess renewable energy usage
• Evaluate efficiency metrics`}
              value={answers.cloudQuestion7}
              onChange={handleChange('cloudQuestion7')}
            />

            <QuestionInput
              question="What resource pooling options are offered by your hosting provider?"
              tooltip={`Resource Pooling Benefits:

1. Energy Efficiency:
   • Shared resource utilization
   • Optimized workload distribution
   • Reduced idle capacity

2. Cost Benefits:
   • Economies of scale
   • Shared infrastructure costs
   • Flexible resource allocation

3. Environmental Impact:
   • Reduced overall energy consumption
   • Better resource utilization
   • Lower carbon footprint per user`}
              value={answers.cloudQuestion8}
              onChange={handleChange('cloudQuestion8')}
            />
          </div>
        )}

        {answers.hosting.local && (
          <div className="dropdown">
            <h4>Additional Questions for Local Server Hosting</h4>

            <QuestionInput
              question="How is your server room powered?"
              tooltip={`Consider:

• Current energy supplier's renewable mix
• Options for renewable energy providers
• On-site renewable energy possibilities
• Energy efficiency measures`}
              value={answers.localQuestion1}
              onChange={handleChange('localQuestion1')}
            />

            <QuestionInput
              question="Are you under pressure to upgrade your reserve energy system (Uninterruptible Power Supply or UPS) to a more energy efficient model?"
              tooltip={`Key Considerations:

1. Current System:
   • Age and efficiency
   • Maintenance status
   • Actual performance

2. Upgrade Impact:
   • Embodied carbon in new equipment
   • Energy efficiency gains
   • Cost-benefit analysis

3. Timing:
   • Wait until current system reaches end of life
   • Plan for future upgrades
   • Consider interim efficiency improvements`}
              value={answers.localQuestion2}
              onChange={handleChange('localQuestion2')}
            />

            <QuestionInput
              question="If you have a generator to back up your UPS, what fuel does it use?"
              tooltip={`Fuel Options Comparison:

Better Environmental Options:
• Bio fuels
• Natural gas
• Hydrogenated Vegetable Oil (HVO)

Considerations:
• Transport emissions for fuel delivery
• Storage requirements
• Environmental impact
• Maintenance needs
• Cost effectiveness`}
              value={answers.localQuestion3}
              onChange={handleChange('localQuestion3')}
            />

            <QuestionInput
              question="What are the environmental impacts of your server room air conditioning system?"
              tooltip={`Key Considerations:

1. Temperature Management:
   • Monitor room temperature
   • Avoid overcooling
   • Optimize temperature settings

2. AC System Efficiency:
   • Current system performance
   • Energy usage monitoring
   • Maintenance schedule

3. Coolant Considerations:
   • Global Warming Potential (GWP) of current coolant
   • Options for lower GWP alternatives
   • HFC replacement planning

4. System Replacement:
   • Consider total carbon footprint
   • Evaluate actual efficiency needs
   • Plan for end-of-life replacement`}
              value={answers.localQuestion4}
              onChange={handleChange('localQuestion4')}
            />

            <QuestionInput
              question="Are the servers/ server racks in your server room arranged to maximise front to rear air flow?"
              tooltip={`Optimization Strategies:

1. Server Rack Arrangement:
   • Front to rear airflow optimization
   • Hot/cold aisle configuration
   • Proper spacing between racks

2. Cooling Efficiency:
   • 'In row' cooling placement
   • Proximity to server cabinets
   • Air flow management
   • Temperature monitoring`}
              value={answers.localQuestion5}
              onChange={handleChange('localQuestion5')}
            />

            <QuestionInput
              question="Can you recover the servers' waste heat for re-use? For example, using the generated heat to warm the building?"
              tooltip={`Heat Recovery Options:

1. Building Heating:
   • Space heating
   • Water heating
   • Climate control

2. Benefits:
   • Reduced energy waste
   • Lower heating costs
   • Improved efficiency
   • Reduced carbon footprint`}
              value={answers.localQuestion6}
              onChange={handleChange('localQuestion6')}
            />

            <QuestionInput
              question="Do you make environmental impact metrics readily available for your server room?"
              tooltip={`Key Metrics:

<li>• Ideal value: 1.0</li>
<li>• Measures total facility power vs IT equipment power</li>
<li>• Includes cooling and lighting energy use</li>

<li>• Ideal value: 0</li>
<li>• Measures carbon emissions</li>
<li>• Indicates renewable energy usage</li>
<br />
Additional Considerations:
<li>• Regular monitoring and reporting</li>
<li>• Transparency in metrics</li>
<li>• Continuous improvement goals</li>`}
              value={answers.localQuestion7}
              onChange={handleChange('localQuestion7')}
            />
          </div>
        )}
      </div>
    </div>
  );
}