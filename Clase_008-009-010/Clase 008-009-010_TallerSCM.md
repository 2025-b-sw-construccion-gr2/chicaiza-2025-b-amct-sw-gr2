# Taller Asincrónico: SCM en el Mundo Real

**Fecha :** 3 de noviembre de 2025

**Integrantes:**
- Chicaiza Andrea
- Rocha Evelin

---

## Noticia (Caso Real): Falla Sistémica en Google Cloud por actualización de software defectuosa (Junio 2025)

### 1. Resumen del Caso

**Fuentes:**
- Google Cloud. (2025, junio 12). *Multiple GCP products are experiencing Service issues*. Google Cloud Status Dashboard. https://status.cloud.google.com/incidents/ow5i3PPK96RduMcb1SsW

- Reuters. (2025, junio 12). *Google Cloud outage hits platforms including Spotify, Discord*. Reuters. https://www.reuters.com/business/google-cloud-down-thousands-users-downdetector-shows-2025-06-12/

- González, B. (2025, junio 17). *Google Cloud colapsa el 12 de junio de 2025: una lección global provocada por un puntero nulo*. CodigoLinea. https://codigolinea.com/google-cloud-colapsa-el-12-de-junio-de-2025-una-leccion-global-provocada-por-un-puntero-nulo/

- Redacción El Universo. (2025, junio 12). *Caída global de los servicios de Google y Spotify afecta a miles de usuarios*. El Universo. https://www.eluniverso.com/noticias/internacional/caida-global-de-los-servicios-de-google-y-spotify-afecta-a-miles-de-usuarios-nota/


**Descripción del problema:**

En junio de 2025, Google Cloud experimentó una falla sistémica global que afectó múltiples servicios e infraestructuras críticas. El incidente se originó tras una actualización defectuosa de software en el componente Service Control, encargado de gestionar cuotas, políticas y permisos de las APIs, además de intervenir en la configuración de red que coordina el tráfico entre centros de datos.

El parche, diseñado para mejorar la eficiencia del enrutamiento y la gestión de políticas, introdujo un error lógico que impedía validar correctamente ciertos valores nulos (null values) distribuidos por la base de datos Spanner. Esto generó excepciones tipo “NullPointer” y fallos en la lógica de balanceo de carga, provocando una cascada de reinicios y desconexiones entre servicios.

Como resultado, diversas regiones sufrieron interrupciones durante 4 a 6 horas, afectando a plataformas como Google Cloud Platform (GCP), Google Workspace, y a miles de clientes empresariales que reportaron caídas en sus aplicaciones, pérdida temporal de acceso a datos y problemas de conectividad con APIs esenciales.

---

## 2. Clasificación del Mantenimiento

**a) Inicialmente - Mantenimiento Perfectivo:**  
La actualización original se implementó con el objetivo de **optimizar el rendimiento** del sistema de enrutamiento de red de Google Cloud. No buscaba corregir un error existente ni adaptarse a cambios externos, sino mejorar la eficiencia operativa del sistema. Este es un ejemplo clásico de **mantenimiento perfectivo**: "hacer que algo que ya funciona, funcione mejor".

**b) Consecuentemente - Mantenimiento Correctivo de Emergencia:**  
Cuando la actualización defectuosa causó la caída del sistema, Google tuvo que realizar un **mantenimiento correctivo urgente** para:  
- Identificar y aislar el código problemático.  
- Revertir la actualización defectuosa (**rollback**).  
- Implementar un **hotfix** que restaurara la estabilidad del sistema.  
- Corregir el bug en la lógica de balanceo de carga.

**c) Componentes Preventivos y Perfectivos posteriores:**  
Tras el incidente, se implementaron mejoras **preventivas** reforzando las validaciones y pruebas automáticas, y ajustes **perfectivos** en la arquitectura de Service Control para evitar que futuras actualizaciones propaguen errores de manera global.

Este caso ilustra cómo un mantenimiento perfectivo mal ejecutado puede convertirse rápidamente en una crisis que requiere mantenimiento correctivo de emergencia, y resalta la importancia de pruebas rigurosas y despliegues graduales en sistemas críticos.


---

### 3. Procesos SCM Involucrados

**Control de Versiones:**

- **Identificación de la versión problemática:** El equipo de Google utilizó su sistema de control de versiones (probablemente una solución interna basada en Git o similar) para identificar exactamente qué commit y qué versión del software de enrutamiento había causado el problema.

- **Creación de rama de emergencia:** Se debió crear una rama de hotfix para desarrollar la solución correctiva mientras se aislaba el código problemático de la rama principal de producción.

- **Rollback controlado:** El control de versiones permitió realizar un rollback (reversión) a la versión anterior estable del software, restaurando el servicio mientras se trabajaba en la corrección definitiva.

- **Trazabilidad del cambio:** Se pudo rastrear quién hizo la modificación, cuándo se aprobó, qué revisiones pasó, y por qué fue aprobada para producción, lo que es crucial para el análisis post-mortem.

**Gestión de Cambios:**

- **Proceso de cambio de emergencia:** Se activó un proceso de gestión de cambios de emergencia (Emergency Change Advisory Board - ECAB) para aprobar rápidamente tanto el rollback como el despliegue del hotfix.

- **Sistema de tickets y seguimiento:** Probablemente se utilizaron herramientas como Jira o sistemas internos para rastrear el incidente, coordinar equipos globales, y documentar cada acción tomada durante la crisis.

- **Comunicación con stakeholders:** La gestión de cambios incluyó notificaciones a clientes empresariales, actualizaciones en el dashboard de estado de Google Cloud, y comunicados oficiales sobre el progreso de la restauración.

- **Aprobaciones aceleradas:** El despliegue del fix requirió aprobaciones de múltiples niveles de ingeniería senior, pero con procesos acelerados dada la criticidad del incidente.

- **Post-mortem:** Después del incidente, se generó documentación formal sobre qué falló en el proceso de change management que permitió que el código defectuoso llegara a producción.

---

### 4. Impacto en el Ciclo de Vida (SDLC)

La resolución de este problema afectó prácticamente todas las fases del SDLC de manera retroactiva y en modo de crisis:

**Planificación:**
- **Re-priorización inmediata:** Todos los sprints y roadmaps planificados fueron pausados. Los equipos tuvieron que re-planificar su trabajo para enfocarse exclusivamente en la resolución del incidente.

**Análisis de Requisitos:**
- **Análisis forense:** Se requirió un análisis profundo para entender exactamente qué había causado la falla y qué requisitos no se habían considerado en la actualización original.
- **Revisión de casos edge:** Se identificaron escenarios de uso no contemplados en el diseño original de la mejora.

**Diseño:**
- **Rediseño de la solución:** El equipo tuvo que diseñar rápidamente tanto la estrategia de rollback como el hotfix definitivo.
- **Diseño de mecanismos de prevención:** Se diseñaron nuevos controles y validaciones para evitar que este tipo de falla se repita.

**Desarrollo:**
- **Desarrollo acelerado del hotfix:** Los programadores trabajaron para desarrollar, en cuestión de horas, el hotdfix.
- **Código de reversión:** Se desarrollaron scripts específicos para revertir cambios de configuración en miles de servidores simultáneamente.

**Pruebas:**
- **Pruebas de regresión exhaustivas pero aceleradas:** Aunque había urgencia, fue crítico realizar pruebas de regresión para asegurar que el rollback y el hotfix no causaran problemas adicionales.
- **Testing en entorno aislado:** Se probó el fix en un entorno staging que replicaba las condiciones de producción antes del despliegue.
- **Pruebas de carga:** Se verificó que la solución pudiera manejar el tráfico real de producción.
- **Balance crítico:** Se tuvo que encontrar el equilibrio entre la velocidad (restaurar el servicio) y la seguridad (no empeorar las cosas).

**Despliegue:**
- **Despliegue de emergencia 24/7:** El despliegue del hotfix se realizó fuera del horario normal de mantenimiento, probablemente en múltiples oleadas (canary deployment) para minimizar riesgos.
- **Coordinación global:** Se requirió sincronización entre equipos en diferentes zonas horarias para desplegar en data centers de múltiples regiones.
- **Monitoreo intensivo:** Durante y después del despliegue, se implementó monitoreo en tiempo real mucho más intenso de lo normal.

**Mantenimiento:**
- **Monitoreo post-incidente:** Se estableció monitoreo adicional para detectar cualquier problema residual o recurrencia del issue.
- **Documentación del incidente:** Se generó documentación exhaustiva del incidente (RCA - Root Cause Analysis / Post-mortem) para aprendizaje organizacional.

---

### 5. Beneficios del SCM

Tener un sistema robusto de Gestión de Configuración de Software fue crucial para manejar esta crisis de manera efectiva:

**1. Capacidad de Rollback Inmediato:**
- Gracias al control de versiones, Google pudo identificar rápidamente la versión estable anterior y revertir el cambio problemático en cuestión de minutos u horas, en lugar de días.
- Sin SCM, habría sido extremadamente difícil saber exactamente qué código revertir sin causar problemas adicionales.

**2. Trazabilidad Completa:**
- El equipo pudo rastrear exactamente qué cambios se habían hecho, por quién, cuándo, y con qué justificación.
- Esta trazabilidad fue esencial para el análisis post-mortem y para identificar las fallas en el proceso de revisión que permitieron que el código defectuoso llegara a producción.

**3. Coordinación entre Equipos Distribuidos:**
- El SCM permitió que múltiples equipos de ingeniería en diferentes ubicaciones geográficas trabajaran simultáneamente en la solución sin pisarse el trabajo.
- Los procesos de merge y branching facilitaron la colaboración en tiempo real durante la crisis.

**4. Gestión de Cambios de Emergencia Estructurada:**
- Aunque fue una emergencia, el proceso de gestión de cambios aseguró que cada acción fuera documentada, aprobada y rastreada.
- Esto previno decisiones caóticas y aseguró que los stakeholders correctos estuvieran informados en cada paso.

**5. Auditoría y Accountability:**
- Se generó un registro completo de todas las acciones tomadas durante el incidente, lo cual es crucial tanto para análisis interno como para cumplimiento regulatorio (muchos clientes de Google Cloud son instituciones financieras o de salud con requisitos estrictos de auditoría).

**6. Prevención de Errores Adicionales:**
- Los procesos de gestión de cambios, incluso en modo de emergencia, incluyeron revisiones de código y pruebas que evitaron que se introdujeran nuevos bugs al intentar arreglar el problema original.

**7. Aprendizaje Organizacional:**
- La documentación generada por el SCM (commits, pull requests, tickets, aprobaciones) proporcionó material invaluable para el análisis post-mortem.
- Este aprendizaje se tradujo en mejoras en los procesos de testing, deployment y code review para prevenir incidentes similares en el futuro.

**8. Confianza del Cliente:**
- Aunque el incidente fue negativo, la capacidad de Google para resolver rápidamente el problema y proporcionar transparencia sobre lo ocurrido (gracias a la trazabilidad del SCM) ayudó a mantener la confianza de los clientes empresariales.

**9. Reducción del Tiempo de Recuperación (MTTR):**
- Sin un sistema SCM robusto, el tiempo de inactividad podría haber sido de días en lugar de horas. El control de versiones y la gestión de cambios redujeron dramáticamente el Mean Time To Recovery (MTTR).

**10. Base para Mejora Continua:**
- El incidente reveló debilidades en el proceso de deployment que pudieron ser abordadas específicamente gracias a la visibilidad que proporcionó el SCM sobre cada paso del proceso que falló.

---

## Conclusión
El incidente de Google Cloud en junio de 2025, originado por un error de puntero nulo en una actualización de software, demuestra que incluso las grandes empresas tecnológicas pueden sufrir fallas críticas. Lo importante fue la rápida respuesta: gracias a un sólido sistema de Gestión de Configuración de Software (SCM), Google logró identificar el fallo, revertir la versión, aplicar un hotfix y documentar el proceso. Este caso muestra que el SCM no es solo una herramienta, sino el núcleo que permite al software recuperarse, aprender y fortalecerse ante los errores.