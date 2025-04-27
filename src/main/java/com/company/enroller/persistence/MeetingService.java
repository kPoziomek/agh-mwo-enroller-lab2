package com.company.enroller.persistence;

import com.company.enroller.model.Meeting;
import org.hibernate.Session;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component("meetingService")
public class MeetingService {
	private static final Logger log = LoggerFactory.getLogger(ParticipantService.class);


	Session session;

	public MeetingService() {
		session = DatabaseConnector.getInstance().getSession();

	}

	public Collection<Meeting> getAll() {
		String hql = "FROM Meeting";
		Query query = this.session.createQuery(hql);
		return query.list();
	}

	public Meeting getMeetingById(long id) {
		String hql = "FROM Meeting WHERE id = :id";
		Query query = this.session.createQuery(hql);
		query.setParameter("id", id);
		return (Meeting) query.uniqueResult();
	}

	public Meeting createMeeting(Meeting meeting) {
		Transaction tx = session.beginTransaction();
		session.save(meeting);
		tx.commit();
		return meeting;
	}
	public Meeting removeMeetingById(long id) {
		Transaction tx = session.beginTransaction();
		session.delete(getMeetingById(id));
		tx.commit();
		return null;
	}
}
