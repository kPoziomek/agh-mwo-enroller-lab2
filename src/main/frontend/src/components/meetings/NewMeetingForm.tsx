import {type ChangeEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import { createMeeting } from '@/services/meetingService.ts';
import toast from "react-hot-toast";
import {useTranslation} from "react-i18next";

export const NewMeetingForm = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const {t} = useTranslation();

  const navigate = useNavigate();

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!formData.title.trim() || !formData.description.trim() || !formData.date.trim()) {
      setError(t('newMeetingForm.error.emptyFields'));
      return;
    }

    setIsSubmitting(true);
    setError('');

    try {
      const newMeeting = await createMeeting(formData);
      
      if (newMeeting) {
        toast(t('newMeetingForm.toastSuccess'));
        navigate('/meetings');
      } else {
        setError(t('newMeetingForm.toastFailure'));
      }
    } catch (err) {
      setError(t('newMeetingForm.error.unknownError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="row mb-2">
        <div className="column">
          <h2 className="mb-0">
            {t('newMeetingForm.title')}
          </h2>
        </div>
        <div className="column column-33">
          <div className="text-center">
            <button 
              type="button"
              onClick={() => navigate('/meetings')}
              className="button button-outline"
            >
              {t('newMeetingForm.cancel')}
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div className="alert alert-error">
          {error}
        </div>
      )}

      <div className="card">
        <form onSubmit={handleSubmit}>
          <fieldset disabled={isSubmitting}>
            
            <label htmlFor="title">
              {t('newMeetingForm.name')}
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder={t('newMeetingForm.namePlaceholder')}
              required
            />

            <label htmlFor="date">
                {t('newMeetingForm.date')}
            </label>
            <input
              type="datetime-local"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />

            <label htmlFor="description">
                {t('newMeetingForm.description')}
              </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={5}
              placeholder={t('newMeetingForm.descriptionPlaceholder')}
              required
            />

            <button
              type="submit" 
              className={`button ${isSubmitting ? 'button-outline' : 'button-success'}`}
              disabled={isSubmitting}
            >
              {isSubmitting ? t("newMeetingForm.loadingButton") : t("newMeetingForm.addButton")}
            </button>
            
          </fieldset>
        </form>
      </div>

      <div className="text-center mt-2">
        <p className="text-muted">
          💡 <strong>{t('newMeetingForm.hint')
        }:</strong> {t('newMeetingForm.hintText')}
        </p>
      </div>
    </div>
  );
};
