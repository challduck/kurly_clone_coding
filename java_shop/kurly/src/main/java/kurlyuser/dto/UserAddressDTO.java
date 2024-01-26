package kurlyuser.dto;

public class UserAddressDTO {
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPostcode() {
		return userPostcode;
	}
	public void setUserPostcode(String userPostcode) {
		this.userPostcode = userPostcode;
	}
	public String getUserAddr() {
		return userAddr;
	}
	public void setUserAddr(String userAddr) {
		this.userAddr = userAddr;
	}
	public String getUserDetailAddr() {
		return userDetailAddr;
	}
	public void setUserDetailAddr(String userDetailAddr) {
		this.userDetailAddr = userDetailAddr;
	}
	private String userId;
	private String userPostcode;
	private String userAddr;
	private String userDetailAddr;
}
