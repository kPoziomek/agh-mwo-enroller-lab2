package com.company.enroller.persistence;

import com.company.enroller.model.Meeting;
import org.hibernate.Session;
import org.hibernate.query.Query;
import org.springframework.stereotype.Component;

import java.util.Collection;

@Component("meetingService")
public class MeetingService {

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

}
