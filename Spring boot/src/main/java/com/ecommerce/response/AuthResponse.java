package com.ecommerce.response;

public class AuthResponse {

	private String jwt;
	
	private boolean status;
	private String msg;
	
	public AuthResponse() {
		// TODO Auto-generated constructor stub
	}

	public AuthResponse(String jwt, String msg) {
		super();
		this.jwt = jwt;
//		this.status = status;
		this.msg = msg;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getJwt() {
		return jwt;
	}

	public void setJwt(String jwt) {
		this.jwt = jwt;
	}

	public boolean getStatus() {
		return status;
	}

	public void setStatus(boolean status) {
		this.status = status;
	}
	
	

	
}
