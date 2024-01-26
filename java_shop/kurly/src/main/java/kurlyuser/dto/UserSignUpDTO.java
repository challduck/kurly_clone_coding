package kurlyuser.dto;

import java.sql.Timestamp;
public class UserSignUpDTO {
	public long getUserKey() {
		return userKey;
	}
	public void setUserKey(long userKey) {
		this.userKey = userKey;
	}
	public String getUserId() {
		return userId;
	}
	public void setUserId(String userId) {
		this.userId = userId;
	}
	public String getUserPw() {
		return userPw;
	}
	public void setUserPw(String userPw) {
		this.userPw = userPw;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserPhone() {
		return userPhone;
	}
	public void setUserPhone(String userPhone) {
		this.userPhone = userPhone;
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
	public String getUserSex() {
		return userSex;
	}
	public void setUserSex(String userSex) {
		this.userSex = userSex;
	}
	public String getUserBirth() {
		return userBirth;
	}
	public void setUserBirth(String userBirth) {
		this.userBirth = userBirth;
	}
	public String getUserRecommender() {
		return userRecommender;
	}
	public void setUserRecommender(String userRecommender) {
		this.userRecommender = userRecommender;
	}
	public String getUserParticipationEventName() {
		return userParticipationEventName;
	}
	public void setUserParticipationEventName(String userParticipationEventName) {
		this.userParticipationEventName = userParticipationEventName;
	}
	public String getUserDelete() {
		return userDelete;
	}
	public void setUserDelete(String userDelete) {
		this.userDelete = userDelete;
	}
	public Timestamp getUserJoinDate() {
		return userJoinDate;
	}
	public void setUserJoinDate(Timestamp userJoinDate) {
		this.userJoinDate = userJoinDate;
	}
	public long getAgreementId() {
		return agreementId;
	}
	public void setAgreementId(long agreementId) {
		this.agreementId = agreementId;
	}
	public boolean isRequiredTermsCondition() {
		return requiredTermsCondition;
	}
	public void setRequiredTermsCondition(boolean requiredTermsCondition) {
		this.requiredTermsCondition = requiredTermsCondition;
	}
	public boolean isRequiredTermsOfPrivacy() {
		return requiredTermsOfPrivacy;
	}
	public void setRequiredTermsOfPrivacy(boolean requiredTermsOfPrivacy) {
		this.requiredTermsOfPrivacy = requiredTermsOfPrivacy;
	}
	public boolean isOptionalTermsOfPrivacy() {
		return optionalTermsOfPrivacy;
	}
	public void setOptionalTermsOfPrivacy(boolean optionalTermsOfPrivacy) {
		this.optionalTermsOfPrivacy = optionalTermsOfPrivacy;
	}
	public boolean isOptionalTermsOfSms() {
		return optionalTermsOfSms;
	}
	public void setOptionalTermsOfSms(boolean optionalTermsOfSms) {
		this.optionalTermsOfSms = optionalTermsOfSms;
	}
	public boolean isOptionalTermsOfMailing() {
		return optionalTermsOfMailing;
	}
	public void setOptionalTermsOfMailing(boolean optionalTermsOfMailing) {
		this.optionalTermsOfMailing = optionalTermsOfMailing;
	}
	public boolean isRequiredSignupAge() {
		return requiredSignupAge;
	}
	public void setRequiredSignupAge(boolean requiredSignupAge) {
		this.requiredSignupAge = requiredSignupAge;
	}
	public String getUserPostcode() {
		return userPostcode;
	}
	public void setUserPostcode(String userPostcode) {
		this.userPostcode = userPostcode;
	}
	
	private long userKey;
	private String userId;
	private String userPw;
	private String userName;
	private String userEmail;
	private String userPhone;
	private String userPostcode;
	private String userAddr;
	private String userDetailAddr;
	private String userSex;
	private String userBirth;
	private String userRecommender;
	private String userParticipationEventName;
	private String userDelete;
	private Timestamp userJoinDate;
    private long agreementId;
    private boolean requiredTermsCondition;
    private boolean requiredTermsOfPrivacy;
    private boolean optionalTermsOfPrivacy;
    private boolean optionalTermsOfSms;
    private boolean optionalTermsOfMailing;
    private boolean requiredSignupAge;
}
