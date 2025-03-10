import { message, Modal } from 'antd';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';
import { getStudentClassroom } from '../../Utils/requests';
import ShareImage from '../../assets/share.png';
import './Student.less';

function Student() {
  const [learningStandard, setLessonModule] = useState({});
  const navigate = useNavigate();
  const [showMissedClassPrompt, setShowMissedClassPrompt] = useState(
    !sessionStorage.getItem('missedClassPromptDismissed')
  );
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getStudentClassroom();
        if (res.data) {
          if (res.data.lesson_module) {
            setLessonModule(res.data.lesson_module);
          }
        } else {
          message.error(res.err);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleSelection = (activity) => {
    activity.lesson_module_name = learningStandard.name;
    localStorage.setItem('my-activity', JSON.stringify(activity));

    navigate('/workspace');
  };

  const dismissPrompt = () => {
    setShowMissedClassPrompt(false);
    sessionStorage.setItem('missedClassPromptDismissed', 'true');
  };

  return (
    <div className='container nav-padding'>
      <NavBar />

      {showMissedClassPrompt && (
      <Modal
        title="Missed Class?"
        visible={showMissedClassPrompt}
        onOk={() => {
          dismissPrompt();
          navigate('/missed-class');
        }}
        onCancel={() => {
          dismissPrompt();
        }}
        okText = "Yes"
        cancelText="No"
      >
        <p>Did you miss yesterday's class?</p>
      </Modal>
      )}

      <div id='activity-container'>
        <div id='header'>
          <div>Select your Activity</div>
        </div>
        <ul>
          {learningStandard.activities ? (
            learningStandard.activities
              .sort((activity1, activity2) => activity1.number - activity2.number)
              .map((activity) => (
                <div
                  key={activity.id}
                  id='list-item-wrapper'
                  onClick={() => handleSelection(activity)}
                >
                  <li>
                    <div className="activity-item">
                      <div className="activity-info">
                        {`${learningStandard.name}: Activity ${activity.number}`}
                      </div>
                      <img src={ShareImage} alt="Share" className="share-icon" />
                    </div>
                  </li>
                </div>
              ))
          ) : (
            <div>
              <p>There is currently no active learning standard set.</p>
              <p>When your classroom manager selects one, it will appear here.</p>
            </div>
          )}
        </ul>
      </div>

      <div id='bottom-section'>
        <div>View programs other students have shared with you</div>
      </div>
    </div>
  );
}

export default Student;

