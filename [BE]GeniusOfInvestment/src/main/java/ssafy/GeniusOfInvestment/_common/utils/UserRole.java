package ssafy.GeniusOfInvestment._common.utils;

import org.springframework.security.core.GrantedAuthority;

public enum UserRole implements GrantedAuthority {
    USER("ROLE_USER","유저권한"),
    ADMIN("ROLE_ADMIN", "관리자권한");

    private String authority;
    private String description;

    UserRole(String authority, String description){
        this.authority = authority;
        this.description = description;
    }
    @Override
    public String getAuthority() {
        return authority;
    }

    public String getDescription(){
        return description;
    }
}
