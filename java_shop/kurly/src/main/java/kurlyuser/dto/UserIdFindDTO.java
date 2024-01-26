package kurlyuser.dto;

import java.sql.Timestamp;

public class UserIdFindDTO {
	public String getUser_name() {
		return user_name;
	}
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	public String getUser_id() {
		return user_id;
	}
	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}
	public String getUser_phone() {
		return user_phone;
	}
	public void setUser_phone(String user_phone) {
		this.user_phone = user_phone;
	}
	public Timestamp getUser_join_date() {
		return user_join_date;
	}
	public void setUser_join_date(Timestamp user_join_date) {
		this.user_join_date = user_join_date;
	}
	private String user_name;
	private String user_id;
	private String user_phone;
	private Timestamp user_join_date;
}
