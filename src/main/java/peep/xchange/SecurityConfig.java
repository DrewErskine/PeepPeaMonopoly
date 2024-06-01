package peep.xchange;

import java.util.HashMap;
import java.util.Map;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;

import jakarta.servlet.http.HttpServletResponse;
import peep.xchange.Filter.JwtAuthorizationFilter;
import peep.xchange.Util.JwtUtil;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final JwtAuthorizationFilter jwtAuthorizationFilter;

    public SecurityConfig(JwtUtil jwtUtil, JwtAuthorizationFilter jwtAuthorizationFilter) {
        this.jwtUtil = jwtUtil;
        this.jwtAuthorizationFilter = jwtAuthorizationFilter;
    }

    @Bean
    SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(Customizer.withDefaults())
            .csrf(csrf -> csrf.disable())
            .authorizeHttpRequests(request -> request
                .requestMatchers("/login", "/logout", "/h2-console/**", "/favicon.ico", "/", "./").permitAll()
                .requestMatchers("/users/**").hasRole("ADMIN")
                .requestMatchers("/cashcards/**").hasAnyRole("CARD-OWNER", "NON-OWNER")
                .requestMatchers("/manifest.json").permitAll()
                .anyRequest().authenticated()
            )
            .formLogin(login -> login
                .loginProcessingUrl("/login")
                .successHandler(authenticationSuccessHandler())
                .failureHandler(authenticationFailureHandler())
                .permitAll())
            .exceptionHandling(exception -> exception
                .authenticationEntryPoint((request, response, authException) -> {
                    response.setContentType("application/json");
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                    response.getWriter().write("{\"error\": \"Unauthorized\"}");
                })
            )
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            .addFilterBefore(jwtAuthorizationFilter, UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    UserDetailsService testOnlyUsers(PasswordEncoder passwordEncoder) {
        User.UserBuilder users = User.builder();
        UserDetails admin = users
            .username("admin")
            .password(passwordEncoder.encode("admin123"))
            .roles("ADMIN")
            .build();
        UserDetails sara = users
            .username("sara")
            .password(passwordEncoder.encode("password"))
            .roles("USER")
            .roles("CARD-OWNER")
            .build();
        UserDetails peep = users
            .username("peep")
            .password(passwordEncoder.encode("meow"))
            .roles("CARD-OWNER")
            .build();
        UserDetails drew = users
            .username("drew")
            .password(passwordEncoder.encode("erskine"))
            .roles("CARD-OWNER")
            .build();
        UserDetails evilDrew = users
            .username("evilDrew")
            .password(passwordEncoder.encode("luf"))
            .roles("NON-OWNER")
            .build();
        return new InMemoryUserDetailsManager(admin, sara, peep, drew, evilDrew);
    }

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return (request, response, authentication) -> {
            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json;charset=UTF-8");

            String token = jwtUtil.generateToken(authentication.getName());

            Map<String, String> responseData = new HashMap<>();
            responseData.put("message", "Login successful");
            responseData.put("token", token);

            ObjectMapper objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(responseData));
        };
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return (request, response, exception) -> {
            response.setContentType("application/json");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.getWriter().write("{\"error\": \"Unauthorized\"}");
        };
    }
}
