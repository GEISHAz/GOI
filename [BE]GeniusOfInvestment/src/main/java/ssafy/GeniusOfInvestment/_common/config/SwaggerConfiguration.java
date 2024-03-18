package ssafy.GeniusOfInvestment.common.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.service.*;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import static springfox.documentation.builders.PathSelectors.regex;
import static springfox.documentation.builders.RequestHandlerSelectors.basePackage;

/**
 * @author WhalesBob
 * @since 2023-11-05
 */
@Configuration
@EnableSwagger2
public class SwaggerConfiguration {

    private final String version = "V1";
    private final String title = "SSAFY 투자의 귀재들 API " + version;

    private final String REFERENCE = "Bearer 토근 값(Bearer 띄워쓰기 붙여서 작성)";

    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2)
                .consumes(getConsumeContentTypes())
                .produces(getProduceContentTypes())
                .apiInfo(apiInfo()).groupName(version)
                .select()
                .apis(basePackage("ssafy.GeniusOfInvestment"))
                .paths(regex("/.*")).build()
                .useDefaultResponseMessages(false)
                .securityContexts(Arrays.asList(securityContext()))
                .securitySchemes(Arrays.asList(securityScheme()));
    }

    private Set<String> getConsumeContentTypes() {
        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        return consumes;
    }

    private Set<String> getProduceContentTypes(){
        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");
        return produces;
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder().title(title)
                .description("<h3>SSAFY GeniusOfInvestment API Reference for Developers</h3>Swagger를 이용한 투자의 귀재들 REST API<br>")
                .contact(new Contact("SSAFY", "https://edu.ssafy.com", "ssafy@ssafy.com"))
                .license("SSAFY License")
                .licenseUrl("https://www.ssafy.com/ksp/jsp/swp/etc/swpPrivacy.jsp")
                .version("1.0").build();
    }

    private SecurityContext securityContext(){
        return SecurityContext
                .builder()
                .securityReferences(defaultAuth())
                .operationSelector(operationContext -> true)
                .build();
    }

    private List<SecurityReference> defaultAuth(){
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = new AuthorizationScope("global", "accessEverything");
        return Arrays.asList(new SecurityReference(REFERENCE, authorizationScopes));
    }

    private HttpAuthenticationScheme bearerAuthSecurityScheme(){
        return HttpAuthenticationScheme.JWT_BEARER_BUILDER
                .name(REFERENCE).build();
    }

    private ApiKey securityScheme(){
        String targetHeader = "Authorization";
        return new ApiKey(REFERENCE, targetHeader, "header");

    }
}